export const ItemType = 'ROW';

export const updateOrder = (data) => {
    return data.map((item, index) => ({ ...item, order: index + 1 }));
};

export const moveRow = (fromIndex, toIndex, fromTable, toTable, visibleColumn, hiddenColumn, setColumns) => {
    setColumns(prevColumns => {
        const fromData = fromTable === 'visibleColumn' ? [...visibleColumn] : [...hiddenColumn];
        const toData = toTable === 'visibleColumn' ? [...visibleColumn] : [...hiddenColumn];

        if (fromTable === toTable) {
            const movedItem = fromData.splice(fromIndex, 1)[0];
            fromData.splice(toIndex, 0, movedItem);
            const updatedData = updateOrder(fromData);
            return prevColumns.map(col => updatedData.find(item => item.id === col.id) || col);
        } else {
            const movedItem = fromData.splice(fromIndex, 1)[0];
            movedItem.visible = toTable === 'visibleColumn';
            toData.splice(toIndex, 0, movedItem);
            const updatedFromData = updateOrder(fromData);
            const updatedToData = updateOrder(toData);
            return prevColumns.map(col => updatedFromData.find(item => item.id === col.id) || updatedToData.find(item => item.id === col.id) || col);
        }
    });
};
