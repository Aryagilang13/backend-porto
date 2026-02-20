import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        about: '',
        thumbnail: null,
        category_id: '',
        keypoints: [''],
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('projects.store'))
    }

    const addKeypoint = () => {
        setData('keypoints', [...data.keypoints, ''])
    }

    const updateKeypoint = (index, value) => {
        const items = [...data.keypoints]
        items[index] = value
        setData('keypoints', items)
    }

    const removeKeypoint = (index) => {
        setData(
            'keypoints',
            data.keypoints.filter((_, i) => i !== index)
        )
    }

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Project" />

            <div className="py-12 max-w-4xl mx-auto text-white">
                <form
                    onSubmit={submit}
                    className="bg-gray-800 p-6 rounded-lg space-y-6"
                >
                    <h2 className="text-xl font-semibold text-white">
                        Create Project
                    </h2>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                                setData('slug', generateSlug(e.target.value));
                            }}
                            className="w-full rounded bg-gray-900 border border-gray-700 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Web Development"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="w-full rounded bg-gray-900 border border-gray-700 px-3 py-2"
                            placeholder="web-development"
                        />
                        {errors.slug && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm">Category</label>
                        <select
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            className="w-full mt-1 rounded bg-gray-900"
                        >
                            <option value="">-- choose --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* About */}
                    <div>
                        <label className="block text-sm">About</label>
                        <textarea
                            value={data.about}
                            onChange={e => setData('about', e.target.value)}
                            className="w-full mt-1 rounded bg-gray-900"
                            rows={5}
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm">Thumbnail</label>
                        <input
                            type="file"
                            onChange={e => setData('thumbnail', e.target.files[0])}
                            className="mt-1"
                        />
                    </div>

                    {/* Keypoints */}
                    <div>
                        <label className="block text-sm mb-2">Keypoints</label>

                        {data.keypoints.map((item, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={e => updateKeypoint(index, e.target.value)}
                                    className="flex-1 rounded bg-gray-900"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeKeypoint(index)}
                                    className="text-red-400"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addKeypoint}
                            className="text-indigo-400 text-sm"
                        >
                            + Add keypoint
                        </button>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end gap-4">
                        <Link
                            href={route('projects.index')}
                            className="text-gray-400"
                        >
                            Cancel
                        </Link>
                        <button
                            disabled={processing}
                            className="bg-indigo-600 px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
