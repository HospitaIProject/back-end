import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CategoryItemContainer from './CategoryItemContainer';
import FilterModalContainer from './FilterModalContainer';

const CATEGORY_ITEMS_SORT = [
    {
        value: '', // 빈 문자열은 최신
        title: '최신순',
    },
    {
        value: 'oldest',
        title: '오래된순',
    },
    // {
    //     value: 'name',
    //     title: '최근 수술일순',
    // },
];
const CATEGORY_ITEMS_CHECKLIST = [
    {
        value: '', // 빈 문자열은 전체
        title: '전체',
    },
    {
        value: 'done',
        title: '미작성',
    },
    {
        value: 'notDone',
        title: '작성 ',
    },
];

type Props = {
    onClose: () => void;
};

function FilterModal({ onClose }: Props) {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 String
    const handleFilter = ({ param, value }: { param: string; value: string }) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === '') {
            params.delete(param);
        } else {
            params.set(param, value);
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };
    const handelReset = () => {};

    return (
        <FilterModalContainer onClose={onClose} handleReset={handelReset}>
            <div className="flex flex-col w-full gap-6 p-4">
                <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold text-gray-700">정렬</span>
                    <div className="flex flex-row flex-wrap gap-2">
                        {CATEGORY_ITEMS_SORT.map((item) => (
                            <CategoryItemContainer
                                key={item.value}
                                onClick={() => handleFilter({ param: 'sort', value: item.value })}
                                isActive={(searchParams.get('sort') || '') === item.value}
                            >
                                {item.title}
                            </CategoryItemContainer>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-semibold text-gray-700">체크리스트 작성 여부</span>
                    <div className="flex flex-row flex-wrap gap-2">
                        {CATEGORY_ITEMS_CHECKLIST.map((item) => (
                            <CategoryItemContainer
                                key={item.value}
                                onClick={() => handleFilter({ param: 'checklist', value: item.value })}
                                isActive={(searchParams.get('checklist') || '') === item.value}
                            >
                                {item.title}
                            </CategoryItemContainer>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="font-semibold text-gray-700 text">기간 조회</span>
                    <div className="flex flex-row gap-4 p-1 overflow-hidden border-2 rounded-full">
                        <input
                            type="date"
                            defaultValue={currentDate}
                            className="flex-1 p-2 text-gray-600 rounded-md outline-none"
                        />
                        <span className="flex items-center justify-center text-gray-400">~</span>
                        <input
                            type="date"
                            defaultValue={currentDate}
                            className="flex-1 p-2 text-gray-600 rounded-md outline-none"
                        />
                    </div>
                </div>
            </div>
        </FilterModalContainer>
    );
}

export default FilterModal;
