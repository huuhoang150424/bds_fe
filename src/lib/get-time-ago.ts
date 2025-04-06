export const getTimeAgo = (lastActive: Date | null) => {
  console.log(lastActive)
  if (!lastActive) return 'Không rõ';
  const now = new Date();
  const diffMs = now.getTime() - new Date(lastActive).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return 'Vừa mới hoạt động';
  if (diffMins < 60) return `Offline ${diffMins} phút trước`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `Offline ${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  return `Offline ${diffDays} ngày trước`;
};
