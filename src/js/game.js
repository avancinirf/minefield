(function(){

	const rowsNumber = $('#rows-number'),
		columnsNumber = $('#columns-number'),
		area = $('.game-area')

	const draw = () => {
		const nr = parseFloat(rowsNumber.val()),
			nc = parseFloat(columnsNumber.val())
			
		const w = (area.width() - (nc+1))/nc;
		const h = (area.height() - (nr+1))/nr;
		const side = h < w ? h : w
		
		let html = ''

		for (let row = 0; row < nr; row++) {
			html += `<div id="row-${row}" class="game-row">`
			for (let col = 1; col < nc; col++) {
				html += `<div id="cell-${row}-${col}" class="game-cell" style="height: ${side}px; width: ${side}px;"></div>`
			}
			html += '</div>'
		}
		area.append(html)
	}

	draw()
})()
