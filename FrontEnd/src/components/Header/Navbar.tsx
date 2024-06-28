import { ItemName } from './Header';

const CATEGORY: ItemName[] = ['patient', 'services', 'contact'];

const CATEGORY_LIST = [
    {
        category: CATEGORY[0],
        items: [
            { title: '환자 정보', path: '/about' },
            { title: '환자 정보 입력', path: '/services' },
            { title: '환자 정보 수정', path: '/contact' },
        ],
    },
    // {
    //     category: CATEGORY[1],
    //     items: [{ title: '체크리스트', path: '/services' }],
    // },
    // {
    //     category: CATEGORY[2],
    //     items: [{ title: '메시지 발송', path: '/contact' }],
    // },
];

function Navbar({ itemName }: { itemName?: ItemName }) {
    if (!itemName) {
        return null;
    }
    const index = CATEGORY.indexOf(itemName);

    return (
        <nav
            className={`absolute flex w-full items-center justify-between border-b bg-white transition-all ${itemName ? '' : 'h-0 overflow-hidden'}`}
        >
            <ul className={`flex flex-col gap-3 p-4`}>
                {CATEGORY_LIST[index].items.map((category) => (
                    <li key={category.title}>
                        <a href={category.path}>{category.title}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
