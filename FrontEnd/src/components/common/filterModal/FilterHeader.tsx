import { useEffect, useState } from 'react';
import FilterIcon from '../../../icons/FilterIcon';
import CategorySearch from './CategorySearch';
import FilterModal from './FilterModal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const FILTER_ITEMS = [
    // {
    //     value: 'all',
    //     title: '전체',
    // },
    {
        value: 'patientName',
        title: '환자이름',
    },
    {
        value: 'patientNumber',
        title: '환자번호',
    },
    {
        value: 'surgeryMethod',
        title: '수술명',
    },
];

function FilterHeader() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const sc = searchParams.get('sc') || 'patientName'; // 검색 카테고리설정
    let fiterCount = 0; //sort,checklist, ,q,sc
    if (searchParams.has('sort')) {
        fiterCount += 1;
    }
    if (searchParams.has('checklist')) {
        fiterCount += 1;
    }

    const openFilterModal = () => {
        setIsFilterModalOpen(true);
    };
    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete('sc');
        } else {
            params.set('sc', value);
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };
    useEffect(() => {}, [sc]);
    return (
        <>
            <div className="sticky top-0 z-10 flex flex-col items-center w-full gap-1 px-4 py-2 bg-white border-b border-blue-200 h-fit">
                <div className="flex flex-row items-center w-full gap-2 mt-1 overflow-x-auto">
                    {FILTER_ITEMS.map((item) => (
                        <button
                            key={item.value}
                            className={`${sc === item.value ? 'border border-blue-500 text-blue-500' : 'border border-transparent bg-gray-100 text-gray-700'} rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out`}
                            onClick={() => handleFilter(item.value)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
                <div className="flex flex-row w-full gap-3 py-1">
                    <CategorySearch />
                    <button onClick={openFilterModal} className="relative">
                        <FilterIcon className="h-[30px] w-[30px] text-gray-600" />
                        <div className="absolute -right-1 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <span className="text-sm">{fiterCount}</span>
                        </div>
                    </button>
                </div>
            </div>
            {isFilterModalOpen && <FilterModal onClose={closeFilterModal} />}
        </>
    );
}

export default FilterHeader;
