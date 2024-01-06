let x = 0
for (let i = 1; i < 100 * 1000 * 1000; i++) {
  x += Math.sqrt(i + Math.log(i) + +Math.random())
}

// document.write('<b>' + x + '</b>')

document.querySelector('p').textContent = x
