import ArrowIcon from '../../icons/ArrowIcon';
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function DesktopPagination() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const handleRouter = ({ selected }: { selected: number }) => {
        const page = selected + 1;
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };

    const forcePage = Number(searchParams.get('page')) ? Number(searchParams.get('page')) - 1 : 0;

    return (
        <ReactPaginate
            previousLabel={
                <ArrowIcon
                    className={`flex h-10 w-14 rotate-180 transform items-center justify-center rounded-md border p-1 ${forcePage === 0 ? 'cursor-not-allowed opacity-40' : ''}`}
                />
            }
            nextLabel={
                <ArrowIcon
                    className={`flex h-10 w-14 items-center justify-center rounded-md border p-1 ${forcePage === 19 ? 'cursor-not-allowed opacity-40' : ''}`}
                />
            }
            breakLabel={
                <div className="flex items-center justify-center w-10 h-10 border rounded-md">
                    <span>..</span>
                </div>
            }
            pageCount={20}
            onPageChange={handleRouter}
            containerClassName={'flex flex-row   gap-2 mx-auto mt-4 items-center '}
            pageLinkClassName={
                'flex items-center justify-center w-10 h-10 text-sm border rounded-md border-neutral-300 hover:border-neutral-500'
            }
            activeLinkClassName="bg-gray-500 text-white"
            pageRangeDisplayed={4} //선택된 페이지 주변에 보여질 페이지 수
            marginPagesDisplayed={1} //첫 페이지와 마지막 페이지 주변에 보여질 페이지 수
            forcePage={forcePage} //선택된 페이지
        />
    );
}

export default DesktopPagination;
