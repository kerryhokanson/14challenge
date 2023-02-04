const logout = async () => {
  console.log("HEllo")
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
console.log(document.getElementById('logout'))
document.getElementById('logout').addEventListener('click', logout);
