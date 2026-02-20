import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Edit({ auth, project, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        name: project.name,
        slug: project.slug,
        about: project.about,
        thumbnail: null,
        category_id: project.category_id,
        keypoints: project.keypoints?.map(k => k.name) ?? [],
    })

    const submit = (e) => {
        e.preventDefault()
        put(route('projects.update', project.id))
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Project" />

            <div className="py-12 max-w-4xl mx-auto">
                <form
                    onSubmit={submit}
                    className="bg-gray-800 p-6 rounded-lg space-y-6"
                >
                    <h2 className="text-xl font-semibold text-white">
                        Edit Project
                    </h2>

                    {/* Name */}
                    <input
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full rounded bg-gray-900"
                    />

                    {/* Category */}
                    <select
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                        className="w-full rounded bg-gray-900"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* About */}
                    <textarea
                        value={data.about}
                        onChange={e => setData('about', e.target.value)}
                        rows={5}
                        className="w-full rounded bg-gray-900"
                    />

                    {/* Thumbnail */}
                    <div>
                        <img
                            src={`/storage/${project.thumbnail}`}
                            className="w-32 mb-2 rounded"
                        />
                        <input
                            type="file"
                            onChange={e => setData('thumbnail', e.target.files[0])}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link
                            href={route('projects.index')}
                            className="text-gray-400"
                        >
                            Cancel
                        </Link>
                        <button className="bg-indigo-600 px-4 py-2 rounded">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
