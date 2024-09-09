import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination';

function ResponsivePagination({ pageSize = 1 }: { pageSize?: number }) {
    return (
        <>
            <div className="flex flex-row w-full mt-auto mobile:hidden">
                <MobilePagination pageSize={pageSize} />
            </div>
            <div className="flex-row hidden w-full mt-auto mobile:flex">
                <DesktopPagination pageSize={pageSize} />
            </div>
        </>
    );
}

export default ResponsivePagination;
