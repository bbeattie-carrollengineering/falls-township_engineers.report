
function formatDateUnix(attributeDate) {
    const date = new Date(attributeDate)
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDateTimeUnix(attributeDate) {
  const date = new Date(attributeDate);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}


  export {
    formatDateUnix,
    formatDateTimeUnix,
  }