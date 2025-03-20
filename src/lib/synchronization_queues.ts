import { v4 as uuidv4 } from 'uuid';
import { BaseDirectory, exists, open, readTextFileLines } from '@tauri-apps/plugin-fs';
import { DATABASE_SYNCHRONIZATION_FILE } from './data';

async function getSynchronizationData(){
    try {
        const fileExists = await exists(DATABASE_SYNCHRONIZATION_FILE, { baseDir: BaseDirectory.AppLocalData });
        if(fileExists){
            // Return JSON
            let textContent = '';
            const lines = await readTextFileLines(DATABASE_SYNCHRONIZATION_FILE, {
                baseDir: BaseDirectory.AppLocalData,
            });
            for await (const line of lines) {
                textContent += line;
            }

            console.log("Pre-trim:", {textContent});

            textContent = textContent.replace("\x00", "");

            console.log({textContent});
            const data:{
                sync:{
                    id:string;
                    table:string;
                    verb:"POST" | "PUT" | "DELETE";
                    data:Record<string,any>,
                    date:Date,
                    synchronized:boolean;
                    url:string;
                    queryParams:Record<string,string>|null;
                }[]
            } = JSON.parse(textContent);

            return data;
        }

        const initialData = {
            sync:[]
        }

        const file = await open(DATABASE_SYNCHRONIZATION_FILE, {
            write: true,
            createNew:true,
            baseDir: BaseDirectory.AppLocalData,
        });
        await file.write(new TextEncoder().encode(JSON.stringify(initialData)));
        await file.close();

        return initialData
    } catch (error) {
        console.log("Error fetching synchronization data:", error);
        return null
    }
}

async function writeTextToFile(text:string, file:string, dir:'applocaldata'='applocaldata'){
    try {
        const fileHandle = await open(file, {
            write: true,
            create: true,
            baseDir: dir==='applocaldata' ? BaseDirectory.AppLocalData : BaseDirectory.AppData,
        });
        await fileHandle.write(new TextEncoder().encode(text));
        await fileHandle.close();
        return true;
    } catch (error) {
        console.log(`Error writing to ${file}`)
        return false;
    }
}

async function clearSynchronizationData(){
    try {
        const initialData = {
            sync:[]
        }
    
        const file = await open(DATABASE_SYNCHRONIZATION_FILE, {
            write: true,
            baseDir: BaseDirectory.AppLocalData,
        });
        await file.write(new TextEncoder().encode(JSON.stringify(initialData)));
        await file.close();
    
        return true;
    } catch (error) {
        console.log("Error clearing synchronization data:",error);
        return false;
    }
}

async function markEntryAsSynchronized(id:string){
    try {
        const syncData = await getSynchronizationData();
        if(syncData){
            syncData.sync = syncData.sync.map((entry)=>{
                if(entry.id===id){
                    return {
                        ...entry,
                        synchronized:true
                    }
                }else{
                    return entry
                }
            })
            return await writeTextToFile(
                JSON.stringify(syncData),
                DATABASE_SYNCHRONIZATION_FILE
            )
        }
        return false;
    } catch (error) {
        console.log("Error marking entry as synchronized:", error);
        return false;
    }
}

async function removeSynchronizedEntries(){
    try {
        const syncData = await getSynchronizationData();
        if(syncData){
            syncData.sync = syncData.sync.filter((entry)=>!entry.synchronized)
            return await writeTextToFile(
                JSON.stringify(syncData),
                DATABASE_SYNCHRONIZATION_FILE
            )
        }
        return false;
    } catch (error) {
        console.log("Error marking entry as synchronized:", error);
        return false;
    }
}

export enum RequestVerb {
    POST,
    PUT,
    DELETE
}

export const cleanSynchronization = async () => {
    const syncData = await getSynchronizationData();
    try {
        if(syncData && syncData.sync.length > 0){
            const unSynchronizedExists = syncData.sync.find((d)=>!d.synchronized);
            if(unSynchronizedExists){
                await removeSynchronizedEntries();
            }else{
                await clearSynchronizationData();
            }
        }
        return true   
    } catch (error) {
        return false;
    }
}

export const addToSynchronizationQueue = async (entry:{
    table:string;
    verb:"POST" | "PUT" | "DELETE";
    data:Record<string,any>,
    url:string;
    queryParams:Record<string,string>|null;
}) => {
    try {
        const currentData = await getSynchronizationData();
        const date = new Date();
        if(currentData){
            currentData.sync.push({...entry, synchronized:false, date, id:uuidv4()});
            const fileWritten = await writeTextToFile(
                JSON.stringify(currentData),
                DATABASE_SYNCHRONIZATION_FILE
            )
            return fileWritten;
        }
        return false;
    } catch (error) {
        console.log("Error adding entry to synchronization queue:", error);
        return false;
    }
}

export const runSynchronization = async (delay=2000) => {
    const syncData = await getSynchronizationData();
    console.log({syncData});
    if(syncData){
        const status = {error:false};
        for (const entry of syncData.sync) {
            try {
                let requestUrl = entry.url;
                
                if (entry.queryParams) {
                    const queryString = new URLSearchParams(entry.queryParams).toString();
                    requestUrl += `?${queryString}`;
                }
                
                const requestOptions: RequestInit = {
                    method: entry.verb,
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
    
                if (entry.verb !== "DELETE") {
                    requestOptions.body = JSON.stringify(entry.data);
                }
                
                const response = await fetch(requestUrl, requestOptions);
                
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
    
                console.log(`Successfully processed entry ${entry.id}`);
                await markEntryAsSynchronized(entry.id);
            } catch (error) {
                console.error(`Error processing entry ${entry.id}:`, error);
                status.error = true;
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        if(status.error){
            return false;
        }else{   
            return await cleanSynchronization();
        }
    }
    return false;
}
