import { useState } from 'react';
import FilterIcon from '../../../icons/FilterIcon';
import CategorySearch from './CategorySearch';
import FilterModal from './FilterModal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useOperationMethodsQuery } from '../../../DefaultCheckListSettingPage/_lib/defaultCheckListSettingService';

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
    // {
    //     value: 'operationMethod',
    //     title: '수술명',
    // },
];

function FilterHeader({ isRender }: { isRender: boolean }) {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const sc = searchParams.get('sc') || 'patientName'; // 검색 카테고리설정
    const operationMethodsQuery = useOperationMethodsQuery();
    const { data: operationMethods } = operationMethodsQuery;
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
    const handleOperation = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete('operationMethod');
        } else {
            params.set('operationMethod', value);
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'patientName') {
            params.delete('sc');
        } else {
            params.set('sc', value);
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };

    return (
        <>
            <div
                className={`${isRender ? 'h-[115px] border-b border-blue-200 py-2 opacity-100' : 'h-0 overflow-hidden opacity-0'} absolute left-0 top-[65px] flex w-full flex-col items-center gap-1 bg-white px-4 transition-all duration-300`}
            >
                <div className="mt-1 flex w-full flex-row items-center justify-between gap-2">
                    {FILTER_ITEMS.map((item) => (
                        <button
                            key={item.value}
                            className={`${sc === item.value ? 'border border-blue-500 text-blue-500' : 'border border-transparent bg-gray-100 text-gray-700'} shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out`}
                            onClick={() => handleFilter(item.value)}
                        >
                            {item.title}
                        </button>
                    ))}
                    <div className="flex flex-grow">
                        <select
                            onChange={(event) => handleOperation(event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-2 py-2 text-xs"
                            value={searchParams.get('operationMethod') || 'all'}
                        >
                            <option value="all">전체(수술명)</option>
                            {operationMethods?.map((method) => (
                                <option key={method} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex w-full flex-row gap-3 py-1">
                    <CategorySearch />
                    <button onClick={openFilterModal} className="relative">
                        <FilterIcon className="h-[30px] w-[30px] text-gray-600" />
                        <div className="absolute -right-1 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue-500 text-white">
                            <span className="text-sm">{fiterCount}</span>
                        </div>
                    </button>
                </div>
            </div>
            {isFilterModalOpen && <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} />}
        </>
    );
}

export default FilterHeader;
