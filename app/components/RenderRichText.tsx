import DOMPurify from 'isomorphic-dompurify';

export default function RenderRichText({ text }: { text: string }) {
    const sanitizedContent: string | TrustedHTML = DOMPurify.sanitize(text);

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} className='render-rich-text' />
    )
}
