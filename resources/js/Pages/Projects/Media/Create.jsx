import { useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, router } from '@inertiajs/react'

export default function Create({ auth, project }) {
    const { data, setData, post, processing, errors } = useForm({
        type: 'image',
        images: [],
        path_trailer: '',
    })

    useEffect(() => {
        if (data.type === 'image') {
            setData('path_trailer', '')
        }

        if (data.type === 'video') {
            setData('images', [])
        }
    }, [data.type])

    const submit = (e) => {
        e.preventDefault()

        post(route('projects.media.store', project.id), {
            forceFormData: true,
            preserveScroll: true,
        })
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Media - ${project.name}`} />

            <div className="max-w-6xl mx-auto py-10 space-y-8">

                <h2 className="text-xl font-semibold text-white">
                    Media for: {project.name}
                </h2>

                <form
                    onSubmit={submit}
                    className="bg-gray-800 p-6 rounded-lg space-y-4"
                >
                    {/* TYPE */}
                    <select
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="bg-gray-900 rounded w-full"
                    >
                        <option value="image">Image</option>
                        <option value="video">YouTube / Video</option>
                    </select>

                    {/* IMAGE */}
                    {data.type === 'image' && (
                        <>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) =>
                                    setData('images', Array.from(e.target.files))
                                }
                                className="text-white"
                            />
                            {errors.images && (
                                <p className="text-red-400 text-sm">
                                    {errors.images}
                                </p>
                            )}
                        </>
                    )}

                    {/* VIDEO */}
                    {data.type === 'video' && (
                        <>
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                value={data.path_trailer}
                                onChange={(e) =>
                                    setData('path_trailer', e.target.value)
                                }
                                className="bg-gray-900 rounded w-full"
                            />
                            {errors.path_trailer && (
                                <p className="text-red-400 text-sm">
                                    {errors.path_trailer}
                                </p>
                            )}
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 px-4 py-2 rounded disabled:opacity-50"
                    >
                        Upload Media
                    </button>
                </form>

                {/* MEDIA LIST */}
                <div className="grid grid-cols-3 gap-4">
                    {project.media.map((media) => (
                        <div
                            key={media.id}
                            className="bg-gray-900 rounded p-2 relative"
                        >
                            {media.type === 'image' ? (
                                <img
                                    src={`/storage/${media.path_image}`}
                                    className="rounded"
                                />
                            ) : (
                                <iframe
                                    src={media.path_trailer}
                                    className="w-full h-40 rounded"
                                    allowFullScreen
                                />
                            )}

                            <button
                                onClick={() =>
                                    confirm('Delete this media?') &&
                                    router.delete(
                                        route(
                                            'projects.media.destroy',
                                            [project.id, media.id]
                                        )
                                    )
                                }
                                className="absolute top-2 right-2 text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
