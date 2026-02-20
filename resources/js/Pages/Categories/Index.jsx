import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index({ auth, categories }) {
    const rows = Array.isArray(categories) ? categories : (categories?.data ?? []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black-200 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Card */}
                    <div className="bg-gray-800 text-gray-100 shadow-sm sm:rounded-lg">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Category List</h3>

                            <Link
                                href={route('categories.create')}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium"
                            >
                                + Add Category
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Icon
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-700">
                                    {rows.length > 0 ? (
                                        rows.map((category) => (
                                            <tr key={category.id} className="hover:bg-gray-700/40">
                                                {/* ICON */}
                                                <td className="px-6 py-4">
                                                    {category.icon ? (
                                                        <img
                                                            src={`/storage/${category.icon}`} // tambahkan /storage/
                                                            alt={category.name + ' icon'}
                                                            className="w-10 h-10 object-contain rounded"
                                                        />
                                                    ) : (
                                                        <span className="text-xl">📁</span>
                                                    )}
                                                </td>


                                                {/* NAME */}
                                                <td className="px-6 py-4 font-medium">
                                                    {category.name}
                                                </td>

                                                {/* SLUG */}
                                                <td className="px-6 py-4 text-gray-400">
                                                    {category.slug}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-10  ">
                                                        <button className="text-indigo-400 hover:text-indigo-300">
                                                            <Link
                                                                href={route('categories.edit', category.id)}
                                                                className="text-indigo-400 hover:text-indigo-300 text-sm"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </button>
                                                        <button className="text-red-400 hover:text-red-300" type='submit' onClick={() => {
                                                            if (confirm('Yakin mau hapus category ini?')) {
                                                                router.delete(route('categories.destroy', category.id));
                                                            }
                                                        }}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-10 text-center text-gray-400"
                                            >
                                                No categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
