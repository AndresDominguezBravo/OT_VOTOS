/* ======================== DATOS ======================== */
const CONCURSANTES = [
    {id:"javi-crespo",nombre:"Javi Crespo",foto:"https://los40.com/resizer/v2/WGQJ7C23SBDFPOM4VFCQ2T7O4A.png?auth=144ddef3f28a2d6fd3dde3968383bce4f013d6d023ecba90e1ea99f59b120b68&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"olivia",nombre:"Olivia",foto:"https://los40.com/resizer/v2/GYCCRE3KMVAXDP6T23DK5S6UQI.png?auth=81d7baa2ff7679bac055d164ec7c52f172945e2a023a23b2e277633d033f97d3&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"guillo-rist",nombre:"Guillo Rist",foto:"https://los40.com/resizer/v2/WRDSEVFNDJHEHF4XEX5XZ42G6M.png?auth=c789aeaef796ad8feeeff32da11980db522ceb7e82e6a86357347e91e5b38448&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"teyou",nombre:"Téyou",foto:"https://los40.com/resizer/v2/Y5FWXWNDFFCZPFHMFSNVFZY77A.png?auth=424bf668ccc627e73840c9f16e99ce59925e69c62f5bdb1b243e72b190d4ffb5&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"tinho",nombre:"Tinho",foto:"https://los40.com/resizer/v2/IE666T3YXZGO7N6CJBLOMPJS64.png?auth=a67070dc1a358f7d163afa808b3dad7c7b1f95f4ae8141f3df0489ead56cd5d3&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"claudia-arenas",nombre:"Claudia Arenas",foto:"https://los40.com/resizer/v2/S277TGVF5BDSXJLMDZPVVTX3ZU.png?auth=e714a60785faa51ef030429ea3a93abd7dee3578a60e1c5ba0084ff0a4d523b7&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"maria-cruz",nombre:"María Cruz",foto:"https://los40.com/resizer/v2/YO34W6IIMRBGTLS45UYKIVHUMY.png?auth=f48ef1aeff8e99af954b9cae4356bd850e9ccd56e0d10a361d4b3073ca41ac70&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"max",nombre:"Max",foto:"https://los40.com/resizer/v2/LC3BYIASKVFKXFAILMOT37Z5SY.png?auth=205f3720cb1bb531579ed105e5307d79a0fdfc1ddeefc028aafafe4df628d18a&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"lucia-casini",nombre:"Lucía Casini",foto:"https://los40.com/resizer/v2/NMRDZTQFFJC4LJGYS2B2TROGJY.png?auth=6ea3b0c9654589ace9e4e82b2c44eca0b9ed3f6839f8a9643322960dc6175707&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"guille-toledano",nombre:"Guille Toledano",foto:"https://los40.com/resizer/v2/MNLQENJLWJFSPLFX72PPDKNGVQ.png?auth=e1d44240b5ada443efa4c04404650f1e3bef81a0297b8026b575f2701e4a2976&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"laura-munoz",nombre:"Laura Muñoz",foto:"https://los40.com/resizer/v2/3VTPFD2OWZEKTADTEUADLJLXHA.png?auth=b996ecf836daa215293b001c157c7b0440714dd96c08182a780205c0625f9392&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"carlos",nombre:"Carlos",foto:"https://los40.com/resizer/v2/6FB2S52NPJF6DHRFOJX72YOAZA.png?auth=600a8f71347c0e7e012973303e74289464c820b875a9ce3bd619c8c78cd30f62&quality=70&width=650&height=929&smart=true",expulsado:true},
    {id:"judit",nombre:"Judit",foto:"https://los40.com/resizer/v2/3LZFQ6JHGRFBFP4PCX2RDPTCSI.png?auth=b065b9348394e3ea4bf29bfabae51bde91126ffa243b9985e5a6ecd472486d42&quality=70&width=650&height=928&smart=true",expulsado:true},
    {id:"cristina",nombre:"Cristina",foto:"https://los40.com/resizer/v2/A4FLPLTFRZBJJG7OS26X65JAFM.png?auth=cd319ea95acfac4929f86ca346983ad37c905eb4b6ff2b4a7912b948e4e21456&quality=70&width=650&height=928&smart=true",expulsado:false},
    {id:"ivan-rojo",nombre:"Iván Rojo",foto:"https://los40.com/resizer/v2/ZUFIZW2YPBCBFONTDWYN56KRLQ.png?auth=7ce19c9074d6ab5a4b47bc892b137140c46c281c3796ad30a06a219e5966415b&quality=70&width=650&height=928&smart=true",expulsado:true},
    {id:"salma-diego",nombre:"Salma de Diego",foto:"https://los40.com/resizer/v2/WJMDZ4R5AFF2PFYBY7HQ3CIIXM.png?auth=383563e97f75cd56ec9eab3c4e00e609abb129163699928dbd919adc6fd668ea&quality=70&width=650&height=928&smart=true",expulsado:true},
    {id:"quique",nombre:"Quique",foto:"https://los40.com/resizer/v2/EM7KKNZMURF3HLQOLAXX4KI63Y.png?auth=51a43614b4a09dd1166b470e7fe0ab7de53fefd593b340b5d128964c85dcc43c&quality=70&width=650&height=928&smart=true",expulsado:true},
    {id:"sam",nombre:"Sam",foto:"https://los40.com/resizer/v2/3YGENM5Y5JDJNCACG442X5GKTM.png?auth=dfdfc7fc2408efbb3839d697b4387301a8aa78cd454a481016cc15d5a6506957&quality=70&width=650&height=928&smart=true",expulsado:true}
  ];
  
  const OPCIONES = ["Nominado","Mehñera","Okey","Chichosa","Absolute Cinema"];
  const VOTE_CLASS = {
    'Nominado':'vote-nominado',
    'Mehñera':'vote-mehnera',
    'Okey':'vote-okey',
    'Chichosa':'vote-chichosa',
    'Absolute Cinema':'vote-absolute-cinema'
  };
  
  /* ======================== ESTADO ======================== */
  const container = document.getElementById('cardsContainer');
  const votos = JSON.parse(localStorage.getItem('votosOT') || '{}');
  let showExpulsados = false;
  
  function clearVotes(){
    Object.keys(votos).forEach(key => delete votos[key]);
    localStorage.removeItem('votosOT');
    const sheet = document.querySelector('.sheet');
    if (sheet) sheet.remove();
    renderCards();
  }

  /* ======================== BARRA DE ACCIONES ======================== */
  /* Garantiza que la barra exista y que SIEMPRE tenga listeners */
  function ensureActionsBar(){
    let bar = container.querySelector('.actions-bar');
    if (!bar){
      bar = document.createElement('div');
      bar.className = 'actions-bar';
      bar.innerHTML = `
        <button id="toggleExpulsadosBtn" class="action-btn ghost" type="button">Mostrar expulsados</button>
        <button id="shareBtn" class="action-btn primary" type="button">Compartir votos</button>
        <button id="resetBtn" class="action-btn danger" type="button">Reiniciar votos</button>
      `;
      container.prepend(bar);
    } else if (!bar.querySelector('#resetBtn')) {
      const resetBtn = document.createElement('button');
      resetBtn.id = 'resetBtn';
      resetBtn.type = 'button';
      resetBtn.className = 'action-btn danger';
      resetBtn.textContent = 'Reiniciar votos';
      bar.appendChild(resetBtn);
    }
    // (Re)atach listeners en cada render
    const btnToggle = bar.querySelector('#toggleExpulsadosBtn');
    const btnShare  = bar.querySelector('#shareBtn');
    const btnReset  = bar.querySelector('#resetBtn');
    
    btnToggle.textContent = showExpulsados ? 'Ocultar expulsados' : 'Mostrar expulsados';
    btnToggle.onclick = () => {
      showExpulsados = !showExpulsados;
      btnToggle.textContent = showExpulsados ? 'Ocultar expulsados' : 'Mostrar expulsados';
      renderCards();
    };
    btnShare.onclick = openSummaryModal;
    btnReset.onclick = () => {
      if (!Object.keys(votos).length) {
        clearVotes();
        return;
      }
      const confirmed = window.confirm('Seguro que quieres reiniciar tus votos?');
      if (confirmed) clearVotes();
    };
    
    return bar;
  }
  
  /* ======================== RENDER ======================== */
  function renderCards() {
    const bar = ensureActionsBar();            // asegura barra y listeners
    container.innerHTML = '';                  // limpia
    container.appendChild(bar);                // preserva barra
  
    const visibles   = CONCURSANTES.filter(c => !c.expulsado);
    const expulsados = CONCURSANTES.filter(c =>  c.expulsado);
    const lista = [...visibles, ...(showExpulsados ? expulsados : [])];
  
    lista.forEach(c => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = c.id;
      if (c.expulsado) card.classList.add('expulsado');
  
      const voto = votos[c.id] || null;
      if (voto && VOTE_CLASS[voto]) card.classList.add(VOTE_CLASS[voto]);
  
      card.innerHTML = `
        <div class="avatar-wrap"><img src="${c.foto}" class="avatar" alt="${c.nombre}"></div>
        <div class="info">
          <div class="name">${c.nombre}${c.expulsado ? ' (Expulsado)' : ''}</div>
          <div class="vote-status">${voto || 'Sin voto'}</div>
        </div>
      `;
  
      if (!c.expulsado) {
        card.addEventListener('click', () => toggleSheet(c.id, card));
      }
      container.appendChild(card);
    });
  }
  
  /* ======================== SHEET ======================== */
  function toggleSheet(id, card){
    const existing = document.querySelector('.sheet');
    if (existing){
      existing.remove();
      if (existing.dataset.id === id) return;
    }
  
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.dataset.id = id;
  
    const c = CONCURSANTES.find(x => x.id === id);
    sheet.innerHTML = `
      <h3>Votar a ${c.nombre}</h3>
      <div class="options">
        ${OPCIONES.map(o => `
          <div class="option-btn ${votos[id]===o?'selected':''}" data-value="${o}">${o}</div>
        `).join('')}
      </div>
    `;
    card.insertAdjacentElement('afterend', sheet);
    requestAnimationFrame(() => sheet.classList.add('active'));
  
    sheet.querySelectorAll('.option-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        votos[id] = btn.dataset.value;
        localStorage.setItem('votosOT', JSON.stringify(votos));
        renderCards();
        sheet.classList.remove('active');
        setTimeout(()=>sheet.remove(), 500);
      });
    });
  }
  
  /* ======================== RESUMEN / COMPARTIR ======================== */
  function getVotadosOrdenados(){
    const out = [];
    CONCURSANTES.forEach(c=>{
      const voto = votos[c.id];
      if (voto) out.push({ c, voto });
    });
    return out;
  }
  
  function buildMiniCard({c, voto}){
    const div = document.createElement('div');
    div.className = 'mini-card';
    if (VOTE_CLASS[voto]) div.classList.add(VOTE_CLASS[voto]);
    if (c.expulsado) div.classList.add('expulsado');
    div.innerHTML = `
      <div class="mini-avatar-wrap"><img class="mini-avatar" src="${c.foto}" alt="${c.nombre}"></div>
      <div class="mini-info">
        <div class="mini-name">${c.nombre}</div>
        <div class="mini-vote">${voto}</div>
      </div>
    `;
    return div;
  }
  
  function openSummaryModal(){
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeSummaryModal(overlay); });
  
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Resumen de votos');
  
    const header = document.createElement('div');
    header.className = 'modal-header';
    header.innerHTML = `<div class="modal-title">Resumen de votos</div>`;
    const actions = document.createElement('div'); actions.className = 'modal-actions';
  
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-btn ghost'; closeBtn.type='button';
    closeBtn.textContent = 'Cerrar'; closeBtn.addEventListener('click', ()=>closeSummaryModal(overlay));
  
    const exportBtn = document.createElement('button');
    exportBtn.className = 'modal-btn primary'; exportBtn.type='button';
    exportBtn.textContent = 'Guardar PNG'; exportBtn.addEventListener('click', exportSummaryPNG);
  
    actions.appendChild(closeBtn); actions.appendChild(exportBtn);
    header.appendChild(actions);
  
    const capture = document.createElement('div'); capture.id = 'captureArea';
    const votados = getVotadosOrdenados();
    if (votados.length === 0){
      capture.innerHTML = `<p style="color:${getComputedStyle(document.documentElement).getPropertyValue('--muted')};margin:6px 0 0 2px;">Aún no hay votos. Selecciona alguno para generar tu resumen.</p>`;
    } else {
      const grid = document.createElement('div'); grid.className = 'summary-grid';
      votados.forEach(v => grid.appendChild(buildMiniCard(v)));
      capture.appendChild(grid);
    }
  
    modal.appendChild(header); modal.appendChild(capture);
    overlay.appendChild(modal); document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.classList.add('open'));
  }
  
  function closeSummaryModal(overlay){
    overlay.classList.remove('open');
    setTimeout(()=>overlay.remove(), 250);
  }
  
  async function exportSummaryPNG(){
    const node = document.getElementById('captureArea');
    if (!node) return;
    const canvas = await html2canvas(node, {
      backgroundColor: getComputedStyle(document.body).backgroundColor || '#0c0d14',
      scale: window.devicePixelRatio > 1 ? 2 : 1
    });
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    const d = new Date(), pad = n => String(n).padStart(2,'0');
    a.download = `votos-ot25_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}.png`;
    a.href = url; a.click();
  }
  
  /* ======================== INIT ======================== */
  renderCards();
  
