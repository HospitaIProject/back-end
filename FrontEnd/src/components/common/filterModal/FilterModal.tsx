import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CategoryItemContainer from './CategoryItemContainer';
import FilterModalContainer from './FilterModalContainer';
import SubmitButton from '../form/SubmitButton';
import { pushNotification } from '../../../utils/pushNotification';

const CATEGORY_ITEMS_SORT = [
    {
        value: '',
        title: '등록순',
    },
    {
        value: 'newest',
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
        title: '완료',
    },
    {
        value: 'notDone',
        title: '미작성',
    },
];

type Props = {
    onClose: () => void;
    isOpen: boolean;
};

function FilterModal({ onClose, isOpen }: Props) {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // const currentDate = new Date().toISOString().split('T')[0]; // 현재 날짜 String
    const handleFilter = ({ param, value }: { param: string; value: string }) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === '') {
            params.delete(param);
        } else {
            params.set(param, value);
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
        pushNotification({
            msg: '적용되었습니다.',
            type: 'success',
            theme: 'light',
            position: 'top-right',
        });
    };
    const handelReset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('sort');
        params.delete('checklist');
        navigate(pathname + '?' + params.toString(), { replace: true });
    };

    return (
        <FilterModalContainer isOpen={isOpen} onClose={onClose} handleReset={handelReset}>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-col w-full h-full gap-6 p-4">
                    {/* <div className="flex flex-col gap-2">
                        <span className="font-semibold text-gray-700 text">기간 조회</span>
                        <div className="flex flex-row gap-4 px-3 py-2 overflow-hidden border-2 rounded-full w-fit">
                            <input
                                type="date"
                                defaultValue={currentDate}
                                className="max-w-[120px] flex-1 rounded-md text-sm text-gray-600 outline-none"
                            />
                            <span className="flex items-center justify-center text-gray-400">~</span>
                            <input
                                type="date"
                                defaultValue={currentDate}
                                className="max-w-[120px] flex-1 rounded-md text-sm text-gray-600 outline-none"
                            />
                        </div>
                    </div> */}
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
                </div>
                <SubmitButton onClick={onClose} label={'닫기'} />
            </div>
        </FilterModalContainer>
    );
}

export default FilterModal;
