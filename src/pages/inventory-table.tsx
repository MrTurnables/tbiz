import { DataTable } from '~/components/data-table';
import useInventory from '~/hooks/use-inventory';
import { inventoryColumns } from '~/lib/component-data';
import { ItemCategory } from '~/lib/types';

const InventoryTable = ({activeCategory}:{activeCategory:ItemCategory}) => {
    const { inventory } = useInventory((state)=>state);
    const items = inventory.filter((inv)=>inv.category===activeCategory);
  return (
    <div className='flex flex-col gap-1'>
        <DataTable
            columns={inventoryColumns}
            data={items}
        />
    </div>
  )
}

export default InventoryTable