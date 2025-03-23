# Inventory Management
Process of tracking, controlling, and managing stock or inventory that a business holds. 
This inventory includes Raw materials, Work-in-progress items, and finished goods ready for sale.

- Helps businesses balance supply and demand
    - Too much inventory ties up cash and storage space
    - Too little inventory leads to running out of products and losing sales

## Objectives
- Meeting customer demands
- Minimizing holding costs
- Avoiding stockouts
- Efficient cashflows
- Maintaining accurate records

## Types of Inventory
1. Raw Materials: Basic materials used to produce goods for sale
2. Work-in-progress (WIP): Items in the process of being made
3. Finished goods: Products that are fully completed and ready to be sold
4. Maintenance, Repair, and Operations Items (MRO): Items not directly part of the finished products but needed to run the business smoothly
5. Safety stock: Extra stock kept on hand to protect against unexpected demand or supply-chan disruption

## Process of Inventory Management
Have the right products in the right amounts and the right time

1. Demand Forecasting
    - Use historical data, market trends and seasonal patterns to estimate how much stock they will need in the future. Avoid overstocking or understocking
2. Inventory Tracking
    - Accurate count of how much inventory is on hand
3. Reordering and stock replenishment
    - Economic Order Quantity (EOQ) = Ideal order size to minimize costs
4. Receiving and Storing Inventory
5. Inventory Auditing
6. Managing dead stock
7. Analysis and Optimizatization

## Techniques in Inventory Management
- Just-in-time: Order products only when needed (E.g In manufacturing)
- First-in, First-Out (FIFO): Oldest inventory is sold first (E.g: Industries with perishable goods)

## ABC Analysis
- A items: High value items that make up a small portion of inventory but a large portion of value
- B items: Moderate value items and moderate sales
- C items: Low value items and frequent sales

## Implementation
Provide status of inventory on a specific data or within specific dates
- Tracking
    [
        {id:"",sku:"",price_per_unit:"",units:"",total_stock_value:""},
    ]
- Opening Stock
    {
        [date]:[
            {id:"",sku:"",item_name:"",price_per_unit:"",units:"",total_stock_value:""},
            {id:"",sku:"",item_name:"",price_per_unit:"",units:"",total_stock_value:""},
        ]
    }
- Purchases / Stock in
    [
        {id:"",date:"",sku:"",item_name:"",price_per_unit:"",units:"",total_stock_value:""}
    ]
- Sales / Stock out
    [
        {id:"",date:"",sku:"",item_name:"",price_per_unit:"",units:"",total_stock_value:""}
    ]
- Current Status of Stock
    {
        [date]:[
            {id:"",sku:"",item_name:"",price_per_unit:"",opening_stock:"",purchases,sales,closing_stock,total_stock_value:""},
        ]
    }
    NB: closing_stock = opening_stock + purchases - sales
        total_stock = closing_stock * price_per_unit