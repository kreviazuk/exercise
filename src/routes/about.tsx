import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/about")({
  component: About,
});

// 模拟API调用
const fetchTeamMembers = async () => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      name: "张三",
      role: "前端工程师",
      experience: "5年",
      avatar: "👨‍💻",
    },
    { id: 2, name: "李四", role: "UI设计师", experience: "3年", avatar: "🎨" },
    { id: 3, name: "王五", role: "产品经理", experience: "4年", avatar: "📋" },
    {
      id: 4,
      name: "赵六",
      role: "后端工程师",
      experience: "6年",
      avatar: "⚙️",
    },
  ];
};

const addTeamMember = async (member: {
  name: string;
  role: string;
  experience: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: Date.now(),
    ...member,
    avatar: "👤",
  };
};

function About() {
  const queryClient = useQueryClient();
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    experience: "",
  });

  // 使用useQuery获取团队成员数据
  const {
    data: teamMembers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: fetchTeamMembers,
    staleTime: 5 * 60 * 1000, // 5分钟内数据被认为是新鲜的
  });

  // 使用useMutation添加新成员
  const addMemberMutation = useMutation({
    mutationFn: addTeamMember,
    onSuccess: (newMember) => {
      // 更新缓存
      queryClient.setQueryData(["teamMembers"], (old: unknown) => [
        ...(old || []),
        newMember,
      ]);
      setNewMember({ name: "", role: "", experience: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.name && newMember.role && newMember.experience) {
      addMemberMutation.mutate(newMember);
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-4">关于我们</h1>
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 团队成员展示 - TanStack Query示例 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">团队成员</h2>
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "加载中..." : "刷新"}
              </button>
            </div>

            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2">加载团队成员中...</p>
              </div>
            )}

            {error && (
              <div className="text-red-600 p-4 border border-red-300 rounded">
                加载失败: {error.message}
              </div>
            )}

            {teamMembers && (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 border rounded-lg flex items-center space-x-4"
                  >
                    <div className="text-3xl">{member.avatar}</div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">
                        经验: {member.experience}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 添加新成员表单 - Mutation示例 */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">添加团队成员</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">职位</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  工作经验
                </label>
                <input
                  type="text"
                  value={newMember.experience}
                  onChange={(e) =>
                    setNewMember({ ...newMember, experience: e.target.value })
                  }
                  placeholder="例如: 3年"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={addMemberMutation.isPending}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {addMemberMutation.isPending ? "添加中..." : "添加成员"}
              </button>
            </form>

            {addMemberMutation.isError && (
              <div className="mt-4 text-red-600 p-3 border border-red-300 rounded">
                添加失败: {addMemberMutation.error?.message}
              </div>
            )}

            {addMemberMutation.isSuccess && (
              <div className="mt-4 text-green-600 p-3 border border-green-300 rounded">
                成员添加成功！
              </div>
            )}
          </div>
        </div>

        {/* TanStack Query 功能说明 */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            🚀 TanStack Query 功能演示
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>数据获取</strong>: 使用 useQuery 自动获取团队成员数据
            </li>
            <li>
              <strong>加载状态</strong>: 显示加载动画和状态
            </li>
            <li>
              <strong>错误处理</strong>: 自动处理网络错误
            </li>
            <li>
              <strong>缓存管理</strong>: 数据缓存5分钟，避免重复请求
            </li>
            <li>
              <strong>数据变更</strong>: 使用 useMutation 添加新成员
            </li>
            <li>
              <strong>乐观更新</strong>: 添加成功后立即更新UI
            </li>
            <li>
              <strong>手动刷新</strong>: 点击刷新按钮重新获取数据
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
