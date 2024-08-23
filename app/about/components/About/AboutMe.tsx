import { Button, RenderRichText } from '@/app/components'
import '../../../styles/rich-text.scss';

export default function AboutMe({ info }: { info: string }) {
    return (
        <div className="about-info">
            <RenderRichText text={info}/>

            <Button href="resume/myResume.pdf" label="Download Resume" target="_blank" />
            <Button href="contact" label="Hire Me" />
        </div>
    )
}
