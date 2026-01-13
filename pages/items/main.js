const icons = [
  // вставте сюди масив рядків з шляхами до файлів, напр.:
  // 'assets/item_icons/health_potion.png',
  // 'assets/item_icons/knife.png',
];

const tbody = document.querySelector('#table1 tbody');
icons.forEach(path => {
  const filename = path.split('/').pop();
  const name = filename.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
  const tr = document.createElement('tr');

  const tdImg = document.createElement('td');
  const img = document.createElement('img');
  img.src = path;
  img.alt = name;
  img.style.width = '40px';
  tdImg.appendChild(img);

  const tdName = document.createElement('td');
  tdName.textContent = name;

  tr.append(tdImg, tdName);
  tbody.appendChild(tr);
});