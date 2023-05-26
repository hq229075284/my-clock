export function spawnNotification() {
  const notification = new window.Notification('使用通知', { body: '通知你' })
}

if (Notification.permission === 'granted') {
  spawnNotification()
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      spawnNotification()
    }
  })
}

// spawnNotification()
