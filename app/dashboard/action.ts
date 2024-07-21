'use server'

export async function updateProfile(formData: FormData) {
    const rawFormData = {
        bio: formData.get('bio'),
        github: formData.get('github'),
        linkedin: formData.get('linkedin'),
        html: formData.get('html'),
        css: formData.get('css'),
    }

    console.log(rawFormData);
}