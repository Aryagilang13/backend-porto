import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        icon: null,
        slug: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.index'), {
            forceFormData: true,
        });
    };

    // auto-generate slug
    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-black-200 leading-tight">
                    Create Category
                </h2>
            }
        >
            <Head title="Create Category" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 text-gray-100 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6 space-y-6">

                            {/* NAME */}
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

                            {/* ICON IMAGE */}
                            <div>
                                <label className="block text-sm mb-1">
                                    Icon Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'icon',
                                            e.target.files ? e.target.files[0] : null
                                        )
                                    }
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    PNG / JPG / SVG (max 2MB)
                                </p>

                                {/* PREVIEW */}
                                {data.icon && (
                                    <img
                                        src={URL.createObjectURL(data.icon)}
                                        alt="Preview"
                                        className="mt-3 w-16 h-16 object-contain bg-gray-900 rounded"
                                    />
                                )}

                                {errors.icon && (
                                    <p className="text-red-400 text-sm">
                                        {errors.icon}
                                    </p>
                                )}
                            </div>

                            {/* SLUG */}
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

                            {/* ACTION */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <Link
                                    href={route('categories.index')}
                                    className="text-sm text-gray-400 hover:text-gray-200"
                                >
                                    ← Back
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Category'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
