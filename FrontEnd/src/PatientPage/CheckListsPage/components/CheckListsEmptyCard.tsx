import ArrowIcon from '../../../icons/ArrowIcon';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

type Props = {
    type: 'PREV' | 'TODAY' | 'POST';
    id: number;
    name: string;
    operationDate: string;
    totalCompleted: number;
};

function CheckListsEmptyCard({ type, id, name, operationDate, totalCompleted }: Props) {
    const navigate = useNavigate();
    let dateComparison = '';
    if (type === 'PREV') {
        dateComparison = '수술 전';
    } else if (type === 'TODAY') {
        dateComparison = '수술 중';
    } else {
        dateComparison = '수술 후';
    }

    const handleRouteCheckListForm = () => {
        if (type === 'TODAY' && totalCompleted < 1) {
            alert('‼️ 이전 체크리스트를 먼저 작성해주세요.');
            return;
        } else if (type === 'POST' && totalCompleted < 2) {
            alert('‼️ 이전 체크리스트를 먼저 작성해주세요.');
            return;
        }
        navigate(`/patient/form/compliance?id=${id}&name=${name}&dateStatus=${type}&od=${operationDate}`);
    };

    return (
        <>
            <li
                className="flex w-full cursor-pointer flex-row items-center gap-1 border-y bg-white px-4 py-3 hover:bg-blue-50"
                // onClick={handleRouteCheckListForm}
            >
                <div className="flex w-full flex-row items-center gap-6">
                    <span className="w-12 flex-shrink-0 font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-row items-center justify-center">
                        <span className="inline-block break-words text-sm text-gray-400">
                            {type === 'PREV' ? '체크리스트 작성 가능' : '체크리스트 작성 가능'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleRouteCheckListForm}
                    className={`mx-1 flex flex-shrink-0 flex-row items-center justify-center gap-1 rounded-lg border p-2 text-gray-400 shadow-sm`}
                >
                    <span className="text-sm">작성하기</span>
                    <ArrowIcon className="h-4 w-4 text-inherit" />
                </button>
            </li>
        </>
    );
}

export default CheckListsEmptyCard;
