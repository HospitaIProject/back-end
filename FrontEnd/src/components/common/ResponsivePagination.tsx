import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination';

function ResponsivePagination() {
    return (
        <>
            <div className="flex flex-row w-full mt-auto mobile:hidden">
                <MobilePagination />
            </div>
            <div className="flex-row hidden w-full mt-auto mobile:flex">
                <DesktopPagination />
            </div>
        </>
    );
}

export default ResponsivePagination;
