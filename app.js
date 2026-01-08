// Energia Pessoal — Geometria do SER
// Cálculo: (1) Ano solar + sexo => Número Anual (base)  (2) Data => mês solar (cortes da matriz)
// (3) Matriz Energética Completa => Energia Pessoal (último dígito)

const CTA_BASE =
  "https://wa.me/5511987545477?text=Oi!%20Fiz%20a%20leitura%20da%20Energia%20Pessoal%20no%20app%20e%20gostaria%20de%20aprofundar.%20Meu%20resultado%20foi:%20Energia%20Pessoal%20";

const PROFILES = {
  1:{symbol:"☵",emoji:"🌊",name:"ÁGUA — KAN",tema:"Profundidade • Travessia • Medo • Confiança",
     luz:["coragem emocional","capacidade de atravessar crises","adaptação","conexão com o invisível"],
     sombra:["medo paralisante","fuga","insegurança","instabilidade"],
     pergunta:"👉 O que está pedindo confiança agora?"},
  2:{symbol:"☷",emoji:"🌍",name:"TERRA — KUN",tema:"Acolhimento • Sustentação • Entrega",
     luz:["receptividade","cuidado","cooperação","base emocional"],
     sombra:["anulação de si","dependência","passividade excessiva"],
     pergunta:"👉 Onde você está se colocando demais em segundo plano?"},
  3:{symbol:"☳",emoji:"⚡",name:"TROVÃO — ZHEN",tema:"Início • Movimento • Despertar",
     luz:["impulso vital","coragem para começar","força de ação"],
     sombra:["impulsividade","reatividade","agir sem direção"],
     pergunta:"👉 O que precisa nascer agora?"},
  4:{symbol:"☴",emoji:"🌬️",name:"VENTO — XUN",tema:"Sensibilidade • Influência • Movimento sutil",
     luz:["intuição","percepção fina","adaptação","flexibilidade"],
     sombra:["dispersão","ansiedade","falta de ancoragem"],
     pergunta:"👉 O que você está sentindo antes de entender?"},
  5:{symbol:"⬤",emoji:"☯️",name:"CENTRO — TERRA CENTRAL",tema:"Equilíbrio • Transição • Reorganização",
     luz:["visão do todo","capacidade de ajuste","maturidade","centramento"],
     sombra:["confusão","instabilidade","sensação de estar perdido"],
     pergunta:"👉 O que precisa ser reorganizado agora?"},
  6:{symbol:"☰",emoji:"☰",name:"CÉU — QIAN",tema:"Direção • Propósito • Liderança",
     luz:["clareza","iniciativa consciente","autoridade interna"],
     sombra:["controle excessivo","rigidez","desconexão emocional"],
     pergunta:"👉 Que direção você está sendo chamada a assumir?"},
  7:{symbol:"☱",emoji:"🌊✨",name:"LAGO — DUI",tema:"Expressão • Comunicação • Alegria",
     luz:["carisma","comunicação sensível","leveza emocional"],
     sombra:["alegria ferida","autocensura","necessidade de agradar"],
     pergunta:"👉 O que precisa ser dito com verdade?"},
  8:{symbol:"☶",emoji:"⛰️",name:"MONTANHA — GEN",tema:"Limites • Estabilidade • Silêncio",
     luz:["firmeza","maturidade","sustentação","presença"],
     sombra:["rigidez","estagnação","isolamento"],
     pergunta:"👉 Onde é preciso parar para avançar?"},
  9:{symbol:"☲",emoji:"🔥",name:"FOGO — LI",tema:"Clareza • Consciência • Visão",
     luz:["lucidez","discernimento","verdade"],
     sombra:["ansiedade","excesso de exposição","confusão emocional"],
     pergunta:"👉 O que está pedindo mais clareza agora?"}
};

// --- Parsing seguro do input date (YYYY-MM-DD)
function parseYMD(dobStr){
  const parts = (dobStr || "").split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]) - 1;
  const d = Number(parts[2]);
  const dt = new Date(y, m, d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt;
}

// --- Ano solar (virada em 04/02)
function getSolarYear(dateObj){
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  if (m < 2 || (m === 2 && d < 4)) return y - 1;
  return y;
}

// --- Número Anual (base) a partir do ano e sexo (equivalente à sua tabela)
function calcAnnualFromYear(sex, year){
  const mod = ((year % 9) + 9) % 9; // 0..8
  if (sex === "M"){
    let n = 11 - mod;
    if (n === 10) n = 1;
    if (n === 11) n = 2;
    return n;
  } else {
    let n = mod + 4;
    if (n > 9) n -= 9;
    return n;
  }
}

// --- Mês solar conforme cabeçalho da matriz (cortes por dia)
function getSolarMonthKey(dateObj){
  const m = dateObj.getMonth()+1; // 1-12
  const d = dateObj.getDate();

  // Janeiro: 05/01 – 03/02
  if ((m === 1 && d >= 5) || (m === 2 && d < 4)) return "jan";
  // Fevereiro: 04/02 – 04/03
  if ((m === 2 && d >= 4) || (m === 3 && d < 5)) return "feb";
  // Março: 05/03 – 03/04
  if ((m === 3 && d >= 5) || (m === 4 && d < 4)) return "mar";
  // Abril: 04/04 – 04/05
  if ((m === 4 && d >= 4) || (m === 5 && d < 5)) return "apr";
  // Maio: 05/05 – 04/06
  if ((m === 5 && d >= 5) || (m === 6 && d < 5)) return "may";
  // Junho: 05/06 – 06/07
  if ((m === 6 && d >= 5) || (m === 7 && d < 7)) return "jun";
  // Julho: 07/07 – 06/08
  if ((m === 7 && d >= 7) || (m === 8 && d < 7)) return "jul";
  // Agosto: 07/08 – 06/09
  if ((m === 8 && d >= 7) || (m === 9 && d < 7)) return "aug";
  // Setembro: 07/09 – 07/10
  if ((m === 9 && d >= 7) || (m === 10 && d < 8)) return "sep";
  // Outubro: 08/10 – 06/11
  if ((m === 10 && d >= 8) || (m === 11 && d < 7)) return "oct";
  // Novembro: 07/11 – 06/12
  if ((m === 11 && d >= 7) || (m === 12 && d < 7)) return "nov";
  // Dezembro: 07/12 – 04/01
  return "dec";
}

// --- Matriz Energética Completa (último número em cada célula da sua tabela)
const MATRIX_ENERGETICA = {
  1: { feb:7, mar:8, apr:9, may:1, jun:2, jul:3, aug:4, sep:5, oct:6, nov:7, dec:8, jan:9 },
  2: { feb:5, mar:6, apr:7, may:8, jun:9, jul:1, aug:2, sep:3, oct:4, nov:5, dec:6, jan:7 },
  3: { feb:3, mar:4, apr:5, may:6, jun:7, jul:8, aug:9, sep:1, oct:2, nov:3, dec:4, jan:5 },
  4: { feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:1, dec:2, jan:3 },
  5: { feb:8, mar:9, apr:1, may:2, jun:3, jul:4, aug:5, sep:6, oct:7, nov:8, dec:9, jan:1 },
  6: { feb:6, mar:7, apr:8, may:9, jun:1, jul:2, aug:3, sep:4, oct:5, nov:6, dec:7, jan:8 },
  7: { feb:4, mar:5, apr:6, may:7, jun:8, jul:9, aug:1, sep:2, oct:3, nov:4, dec:5, jan:6 },
  8: { feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:1, nov:2, dec:3, jan:4 },
  9: { feb:9, mar:1, apr:2, may:3, jun:4, jul:5, aug:6, sep:7, oct:8, nov:9, dec:1, jan:2 }
};

function getPersonalNumber(annualNum, solarMonthKey){
  const row = MATRIX_ENERGETICA[annualNum];
  if (!row) return annualNum;
  return row[solarMonthKey] || annualNum;
}

// --- Helpers UI
function qs(id){ return document.getElementById(id); }
function setList(ul, items){
  ul.innerHTML = "";
  items.forEach(v => {
    const li = document.createElement("li");
    li.textContent = v;
    ul.appendChild(li);
  });
}

// --- Share card
function roundRect(ctx, x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(/\s+/);
  let line = "";
  for (let n = 0; n < words.length; n++){
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0){
      ctx.fillText(line.trim(), x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

function drawShareCard(payload){
  const canvas = qs("shareCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  ctx.clearRect(0,0,W,H);
  const grad = ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0, "#0e0f12");
  grad.addColorStop(1, "#07080b");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,W,H);

  ctx.globalAlpha = 0.16;
  ctx.beginPath();
  ctx.arc(220, 120, 260, 0, Math.PI*2);
  ctx.fillStyle = "#d7d1c6";
  ctx.fill();
  ctx.globalAlpha = 1;

  const pad = 56;
  roundRect(ctx, pad, pad, W - pad*2, H - pad*2, 26);
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#b9bdc7";
  ctx.font = "600 22px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillText("Geometria do SER", pad + 70, pad + 80);

  ctx.fillStyle = "#f1f2f4";
  ctx.font = "750 56px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillText("Energia Pessoal", pad + 70, pad + 150);

  ctx.fillStyle = "#d7d1c6";
  ctx.font = "800 140px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillText(String(payload.num), pad + 70, pad + 300);

  ctx.fillStyle = "#f1f2f4";
  ctx.font = "650 40px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillText(`${payload.profile.emoji} ${payload.profile.symbol}  ${payload.profile.name}`, pad + 70, pad + 360);

  ctx.fillStyle = "#b9bdc7";
  ctx.font = "500 26px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  wrapText(ctx, payload.profile.tema, pad + 70, pad + 410, (W - pad*2) - 140, 34);

  ctx.fillStyle = "rgba(241,242,244,0.55)";
  ctx.font = "500 20px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillText("Faça o teste gratuito • Energia Pessoal", pad + 70, H - pad - 30);

  return canvas;
}

async function saveImage(payload){
  const canvas = drawShareCard(payload);
  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `energia-pessoal-${payload.num}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function share(payload){
  const canvas = drawShareCard(payload);
  const blob = await new Promise(res => canvas.toBlob(res, "image/png"));
  const file = new File([blob], `energia-pessoal-${payload.num}.png`, { type: "image/png" });
  const shareUrl = window.location.href;

  try{
    if (navigator.canShare && navigator.canShare({ files:[file] }) && navigator.share){
      await navigator.share({ title:"Energia Pessoal — Geometria do SER", text:"Fiz minha leitura da Energia Pessoal. Faça a sua também:", url:shareUrl, files:[file] });
      return;
    }
  }catch(e){}

  try{
    if (navigator.share){
      await navigator.share({ title:"Energia Pessoal — Geometria do SER", text:"Fiz minha leitura da Energia Pessoal. Faça a sua também:", url:shareUrl });
      return;
    }
  }catch(e){}

  try{
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copiado! Agora é só colar onde quiser.");
  }catch(e){
    prompt("Copie o link:", shareUrl);
  }
}

function renderResult(sex, dobStr){
  const dateObj = parseYMD(dobStr);
  if (!dateObj) return null;

  const solarYear = getSolarYear(dateObj);
  const annualNum = calcAnnualFromYear(sex, solarYear);
  const monthKey = getSolarMonthKey(dateObj);
  const personalNum = getPersonalNumber(annualNum, monthKey);

  const p = PROFILES[personalNum];

  qs("num").textContent = String(personalNum);
  qs("triSymbol").textContent = `${p.emoji} ${p.symbol}`;
  qs("triName").textContent = p.name;
  qs("tema").textContent = p.tema;
  setList(qs("luz"), p.luz);
  setList(qs("sombra"), p.sombra);
  qs("pergunta").textContent = p.pergunta;

  // Não expor Essência como entrega (fica implícito)
  const meta = qs("meta");
  if (meta) meta.textContent = "";

  qs("cta").href = CTA_BASE + personalNum;
  qs("result").classList.remove("hidden");

  // URL para compartilhar o mesmo resultado
  const url = new URL(window.location.href);
  url.searchParams.set("sex", sex);
  url.searchParams.set("dob", dobStr);
  url.searchParams.set("n", String(personalNum));
  window.history.replaceState({}, "", url.toString());

  return { num: personalNum, profile: p, solarYear, annualNum, monthKey };
}

function init(){
  const form = qs("calcForm");
  const sexEl = qs("sex");
  const dobEl = qs("dob");

  // Prefill via URL (opcional)
  const url = new URL(window.location.href);
  const sex = url.searchParams.get("sex");
  const dob = url.searchParams.get("dob");
  if (sex && (sex === "F" || sex === "M")) sexEl.value = sex;
  if (dob) dobEl.value = dob;

  let lastPayload = null;
  if (sexEl.value && dobEl.value){
    lastPayload = renderResult(sexEl.value, dobEl.value);
  }

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (!sexEl.value || !dobEl.value) return;
    lastPayload = renderResult(sexEl.value, dobEl.value);
    if (lastPayload){
      qs("result").scrollIntoView({ behavior: "smooth", block:"start" });
    }
  });

  qs("saveBtn").addEventListener("click", async ()=>{
    if (!lastPayload) return;
    await saveImage(lastPayload);
  });

  qs("shareBtn").addEventListener("click", async ()=>{
    if (!lastPayload) return;
    await share(lastPayload);
  });
}

document.addEventListener("DOMContentLoaded", init);
