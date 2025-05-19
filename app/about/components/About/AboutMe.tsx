import { Button, RenderRichText } from '@/app/components'
import '../../../styles/rich-text.scss';

export default function AboutMe({ info, resume }: { info: string, resume: string }) {
    return (
        <div className="about-info">
            <RenderRichText text={info} />

            <Button href={resume} label="Download Resume" target="_blank" />
            <Button href="/contact" label="Contact Me" />
        </div>
    )
}
