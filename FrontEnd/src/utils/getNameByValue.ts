const MATCH_ITEMS = {
    COLOSTOMY: 'Colostomy',
    IlEOSTOMY: 'Ileostomy',
    UROSTOMY: 'Urostomy',
    GASTROSTOMY: 'Gastrostomy',
    JEJUNOSTOMY: 'Jejunostomy',
};
export function getNameByValue(value: string) {
    const item = MATCH_ITEMS[value as keyof typeof MATCH_ITEMS];
    return item;
}
