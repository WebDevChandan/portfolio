'use server'

export async function updateProfile(formData: FormData) {
   try {
    const rawFormData = {
        bio: formData.get('bio') as string | null,
        github: formData.get('github') as string | null,
        linkedin: formData.get('linkedin') as string | null,
        html: formData.get('html') as string | null,
        css: formData.get('css') as string | null,
        file: formData.get('aboutImage') instanceof File ? formData.get('aboutImage') as File : null
    };

    // console.log(rawFormData.file?.name); // Retrieve and log the file name
    console.log(formData);
    
   } catch (error) {
        console.log(error);
   }
}
