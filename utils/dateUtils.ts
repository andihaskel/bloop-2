export function formatDate(date: string, time: string): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const targetDate = new Date(date);
  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  
  let dateText = '';
  
  if (targetDateOnly.getTime() === today.getTime()) {
    dateText = 'Today';
  } else if (targetDateOnly.getTime() === tomorrow.getTime()) {
    dateText = 'Tomorrow';
  } else {
    dateText = targetDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
  
  // Format time to 12-hour format
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const timeFormatted = `${hour12}:${minutes} ${ampm}`;
  
  return `${dateText}, ${timeFormatted}`;
}

export function formatShortDate(date: string): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const targetDate = new Date(date);
  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  
  if (targetDateOnly.getTime() === today.getTime()) {
    return 'Today';
  } else if (targetDateOnly.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else {
    return targetDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
}

export function getTomorrow(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function getCurrentTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}