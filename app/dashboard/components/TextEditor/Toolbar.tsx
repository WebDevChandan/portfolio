import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import { BiRedo, BiUndo } from "react-icons/bi";
import { CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { LiaMarkerSolid } from "react-icons/lia";
import { LuHeading2, LuHeading3 } from "react-icons/lu";
import { MdCode, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdOutlineHorizontalRule } from "react-icons/md";
import { useEditorAction } from "../../hook/useEditorAction";

export default function Toolbar({ editor }: { editor: Editor | null, }) {
    const { isEditable } = useEditorAction();

    const setLink = useCallback(() => {
        if (!editor)
            return null;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();

            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

    }, [editor]);


    const handleToolBar = (e: React.MouseEvent<HTMLOrSVGElement>, label: string) => {
        e.preventDefault();

        if (!editor)
            return null;

        if (!isEditable)
            return;

        switch (label) {
            case "bold":
                editor.chain().focus().toggleBold().run();
                break;

            case "underline":
                console.log("underline");
                editor.chain().focus().toggleUnderline().run();
                break;

            case "orderedList":
                editor.chain().focus().toggleOrderedList().run();
                break;

            case "bulletList":
                editor.chain().focus().toggleBulletList().run();
                break;

            case "code":
                editor.chain().focus().toggleCode().run();
                break;

            case "mark":
                editor.chain().focus().toggleHighlight({ color: "#FFFF00" }).run();
                break;

            case "undo":
                editor.chain().focus().undo().run();
                break;

            case "redo":
                editor.chain().focus().redo().run();
                break;

            case "textAlignLeft":
                editor.chain().focus().setTextAlign('left').run();
                break;

            case "textAlignCenter":
                editor.chain().focus().setTextAlign('center').run();
                break;

            case "textAlignRight":
                editor.chain().focus().setTextAlign('right').run();
                break;

            case "horizontalRule":
                editor.chain().focus().setHorizontalRule().run();
                break;

            case "heading2":
                editor.chain().focus().setHeading({ level: 2 }).run();
                break;

            case "heading3":
                editor.chain().focus().setHeading({ level: 3 }).run();
                break;

            default:
                break;
        }
    };

    if (!editor)
        return null;

    return (
        <div className={`toolbar-container ${isEditable ? "inner-shadow" : "outer-shadow disabled"}`}>
            <div className={`toolbar ${isEditable ? "" : "disabled"}`}>
                <MdFormatBold
                    className={editor.isActive("bold") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "bold")}
                />

                <MdFormatUnderlined
                    className={editor.isActive("underline") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "underline")}
                />

                <FaLink
                    className={editor.isActive("link") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                        e.preventDefault();
                        setLink();
                    }}
                />

                <MdFormatItalic
                    className={editor.isActive("italic") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "italic")}
                />

                <GoListOrdered
                    className={editor.isActive("orderedList") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "orderedList")}
                />

                <GoListUnordered
                    className={editor.isActive("bulletList") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "bulletList")}
                />

                <MdCode
                    className={editor.isActive("code") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "code")}
                />

                <LiaMarkerSolid
                    className={editor.isActive("mark") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "mark")}
                />


                <CiTextAlignLeft
                    className={editor.isActive({ textAlign: "left" }) && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "textAlignLeft")}
                />

                <CiTextAlignJustify
                    className={editor.isActive({ textAlign: "center" }) && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "textAlignCenter")}
                />
                <CiTextAlignRight
                    className={editor.isActive({ textAlign: "right" }) && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "textAlignRight")}
                />

                <BiUndo
                    className={editor.isActive("undo") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "undo")}
                />

                <BiRedo
                    className={editor.isActive("redo") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "redo")}
                />

                <MdOutlineHorizontalRule
                    className={editor.isActive("horizontalRule") && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "horizontalRule")}
                />
                <LuHeading2
                    className={editor.isActive('heading', { level: 2 }) && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "heading2")}
                />

                <LuHeading3
                    className={editor.isActive('heading', { level: 3 }) && isEditable ? "active" : ""}
                    onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => handleToolBar(e, "heading3")}
                />
            </div>
        </div>
    )
}
