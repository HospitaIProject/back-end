import ArrowIcon from '../../../icons/ArrowIcon';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

type Props = {
    type: 'PREV' | 'TODAY';
    id: number;
    name: string;
};

function CheckListsEmptyCard({ type, id, name }: Props) {
    const dateComparison = type === 'PREV' ? '수술 전' : '수술 중';

    const handleRouteCheckListForm = () => {
        // navigate(
        //     `/patient/form/compliance?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}&diffDay=${diffDay}`,
        // );
    };

    return (
        <>
            <li
                className="flex flex-row items-center w-full gap-1 px-4 py-3 bg-white cursor-pointer border-y hover:bg-blue-50"
                onClick={handleRouteCheckListForm}
            >
                <div className="flex flex-row items-center w-full gap-3">
                    <span className="flex-shrink-0 w-12 font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-row items-center justify-center">
                        <span className="inline-block text-sm text-gray-400 break-words">
                            {type === 'PREV' ? '체크리스트 작성가능' : '체크리스트 작성가능'}
                        </span>
                    </div>
                </div>
                <Link
                    to={`/patient/form/compliance?id=${id}&name=${name}&dateStatus=${type}&diffDay=${type === 'PREV' ? 1 : 0}`}
                    className={`mx-1 flex flex-shrink-0 flex-row items-center justify-center gap-1 rounded-lg border p-2 text-gray-400 shadow-sm`}
                >
                    <span className="text-sm">작성하기</span>
                    <ArrowIcon className="w-4 h-4 text-inherit" />
                </Link>
            </li>
        </>
    );
}

export default CheckListsEmptyCard;
