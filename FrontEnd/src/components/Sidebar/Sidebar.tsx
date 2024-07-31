import SideBarContainer from './SideBarContainer';

interface Props {
    onClose: () => void;
}
function Sidebar({ onClose }: Props) {
    return (
        <SideBarContainer onClose={onClose}>
            <div>xx</div>
        </SideBarContainer>
    );
}

export default Sidebar;
