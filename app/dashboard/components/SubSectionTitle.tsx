import '.././styles/subSectionTitle.scss';
import AddButton from './AddButton';

export default function SubSectionTitle({ title }: { title: string }) {
    
    return (
        <div className="row">
            <div className="subSection-title">
                <h3>{title}</h3>
                <AddButton />
            </div>
        </div>
    )
}
