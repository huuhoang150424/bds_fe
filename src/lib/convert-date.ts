import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from 'date-fns';

export const convertDate = (isoString?: string) => {
  if (!isoString) return "N/A"; 

  try {
    const timeZone = "Asia/Ho_Chi_Minh"; 
    const date = toZonedTime(new Date(isoString), timeZone);
    return format(date, "dd/MM/yyyy HH:mm", { locale: vi });
  } catch (error) {
    return "Invalid date"; 
  }
};

export const formatRelativeTime = (dateString?: string) => {
  if (!dateString) return '';

  return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: vi });
};
