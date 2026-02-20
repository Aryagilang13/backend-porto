import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'

export default function Index({ auth, projects }) {
    const rows = Array.isArray(projects)
        ? projects
        : (projects?.data ?? [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black-200 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-gray-800 text-gray-100 shadow-sm sm:rounded-lg">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Project List
                            </h3>

                            <Link
                                href={route('projects.create')}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium"
                            >
                                + Add Project
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs uppercase">
                                            Thumbnail
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs uppercase">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs uppercase">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs uppercase">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-700">
                                    {rows.length > 0 ? (
                                        rows.map(project => (
                                            <tr
                                                key={project.id}
                                                className="hover:bg-gray-700/40"
                                            >
                                                {/* Thumbnail */}
                                                <td className="px-6 py-4">
                                                    {project.thumbnail ? (
                                                        <img
                                                            src={`/storage/${project.thumbnail}`}
                                                            className="w-16 h-10 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <span>—</span>
                                                    )}
                                                </td>

                                                {/* Name */}
                                                <td className="px-6 py-4 font-medium">
                                                    {project.name}
                                                </td>

                                                {/* Category */}
                                                <td className="px-6 py-4 text-gray-400">
                                                    {project.category?.name}
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-6">
                                                        <Link
                                                            href={route('projects.edit', project.id)}
                                                            className="text-indigo-400 hover:text-indigo-300 text-sm"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Hapus project ini?')) {
                                                                    router.delete(
                                                                        route('projects.destroy', project.id)
                                                                    )
                                                                }
                                                            }}
                                                            className="text-red-400 hover:text-red-300 text-sm"
                                                        >
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
                                                No projects found.
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
    )
}
