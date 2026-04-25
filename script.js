/* 🎨 お絵描きお題ガチャの「動き」を作るプログラム 🎨 */

// --- 1. 準備（じゅんび）：画面にあるボタンや場所をプログラムで使えるようにするよ ---
const promptResult = document.getElementById('prompt-result');
const challengeResult = document.getElementById('challenge-result');
const generateBtn = document.getElementById('generate-btn');
const keepBtn = document.getElementById('keep-btn');
const keepList = document.getElementById('keep-list');
const challengeCheck = document.getElementById('challenge-check');
const genreButtons = document.querySelectorAll('.genre-btn');

// 画面切り替えのためのボタンなど
const gachaScreen = document.getElementById('gacha-screen');
const listScreen = document.getElementById('list-screen');
const viewListBtn = document.getElementById('view-list-btn');
const backBtn = document.getElementById('back-btn');

// 色のボタン
const colorBtn = document.getElementById('color-btn');
const colorBalls = document.querySelectorAll('.color-ball');
const keepColorBtn = document.getElementById('keep-color-btn');

// 選ばれた色を覚えておくためのリスト
let currentColors = [];

// --- 2. 画面を切り替える動き ---
function showGacha() {
    listScreen.classList.remove('active');
    gachaScreen.classList.add('active');
}

function showList() {
    gachaScreen.classList.remove('active');
    listScreen.classList.add('active');
}

viewListBtn.addEventListener('click', showList);
backBtn.addEventListener('click', showGacha);

// --- 3. データ：お題のリスト ---
const prompts = {
    'fantasy': [
        "火をふく大きな竜", "空飛ぶ島にあるキラキラしたお城", "ふしぎな光る魔法を使う魔法使い",
        "おしゃべりするキノコがいる魔法の森", "伝説の剣をみつけた小さな勇者",
        "虹色の羽根を持つ伝説の鳥", "全部が氷でできたお城と氷の女王様",
        "宝箱に化けて待っているモンスター", "森の中のティーパーティー", "宇宙へ行く銀河鉄道"
    ],
    'modern': [
        "放課後の教室で笑っている友達", "雨の中、葉っぱの傘をさす猫", "街のケーキ屋さん",
        "公園のブランコで遊ぶ子どもたち", "ハンバーガーを食べている人",
        "水族館のジンベエザメ", "真夜中のコンビニでアイスを買う人", "巨大な雪だるま",
        "夕暮れの静かな踏切", "真っ赤なスポーツカー"
    ],
    'sf': [
        "宇宙船から見える地球", "ロボットをなおしているエンジニア", "未来の大きな街",
        "星をたべる宇宙クジラ", "空飛ぶスケートボードで遊ぶ少年",
        "ふわふわ浮いているピザ", "悪い宇宙人を追う宇宙警察", "宇宙ステーションの植物",
        "アンドロイドのアイドル", "すごいスピードの未来の新幹線"
    ]
};

const challenges = [
    "⏳ 制限時間：3分で描こう！", "🎨 使える色は3色だけ！", "📏 四角や直線だけで描こう",
    "👀 目をつぶって10秒描いてからスタート！", "🖋️ 1回もペンを離さないで描いてみよう",
    "🖐️ 逆の手だけで描いてみよう！", "🙈 画面を見ないで1分描こう",
    "🖌️ 太いペンだけで描こう", "🔴 丸い形だけで描いて！", "⏱️ 30秒で下描き、30秒で色ぬり！"
];

// --- 4. ジャンルを切り替える動き ---
let currentGenre = 'fantasy';
genreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        genreButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentGenre = btn.id.replace('-btn', '');
    });
});

// --- 5. 「お題を出す！」ボタンを押した時の動き ---
generateBtn.addEventListener('click', () => {
    const currentList = prompts[currentGenre];
    const randomIndex = Math.floor(Math.random() * currentList.length);
    const selectedPrompt = currentList[randomIndex];
    promptResult.innerText = selectedPrompt;

    if (challengeCheck.checked) {
        const challengeIndex = Math.floor(Math.random() * challenges.length);
        challengeResult.innerText = challenges[challengeIndex];
    } else {
        challengeResult.innerText = "";
    }
});

// --- 6. 共通（きょうつう）：お気に入りに保存する動き ---
function saveToKeepList(text, colors) {
    const li = document.createElement('li');
    li.innerText = text;

    // --- 今の時間をゲットして表示する ---
    const now = new Date();
    // 「2026/04/11 10:05」のように数字を並べて書き出す
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const timeStr = year + "/" + month + "/" + date + " " + hours + ":" + minutes + "に保存";
    const timeSpan = document.createElement('span');
    timeSpan.className = 'keep-time';
    timeSpan.innerText = timeStr;

    // 色があれば並べる
    if (colors && colors.length > 0) {
        const colorArea = document.createElement('div');
        colorArea.className = 'keep-list-colors';
        colors.forEach(c => {
            const span = document.createElement('span');
            span.className = 'mini-color-ball';
            span.style.backgroundColor = c;
            colorArea.appendChild(span);
        });
        li.appendChild(colorArea);
    }

    li.appendChild(timeSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => li.remove();
    li.appendChild(deleteBtn);

    keepList.appendChild(li);
}

// お題（と色）をキープする
keepBtn.addEventListener('click', () => {
    const text = promptResult.innerText;
    if (text === "「お題を出す」ボタンを押してね！") return;

    saveToKeepList(text, currentColors);

    keepBtn.style.transform = "scale(1.1)";
    setTimeout(() => { keepBtn.style.transform = "scale(1.0)"; }, 200);
});

// 色だけをキープする
keepColorBtn.addEventListener('click', () => {
    if (currentColors.length === 0) return;

    saveToKeepList("🎨 きめた色", currentColors);

    keepColorBtn.style.transform = "scale(1.1)";
    setTimeout(() => { keepColorBtn.style.transform = "scale(1.0)"; }, 200);
});

// --- 7. 色のルーレットの動き ---
const colorPalette = [
    { name: "赤", code: "#f44336" }, { name: "青", code: "#2196f3" }, { name: "黄色", code: "#ffeb3b" },
    { name: "緑", code: "#4caf50" }, { name: "オレンジ", code: "#ff9800" }, { name: "紫", code: "#9c27b0" },
    { name: "ピンク", code: "#e91e63" }, { name: "茶色", code: "#795548" }, { name: "水色", code: "#00bcd4" },
    { name: "黄緑", code: "#8bc34a" }, { name: "黒", code: "#333333" }, { name: "グレー", code: "#9e9e9e" },
    { name: "金色", code: "#ffd700" }, { name: "銀色", code: "#c0c0c0" }, { name: "ピーチ", code: "#ffccbc" },
    { name: "ミント", code: "#b2dfdb" }, { name: "ネイビー", code: "#1a237e" }, { name: "えんじ", code: "#880e4f" },
    { name: "ベージュ", code: "#f5f5dc" }, { name: "ラベンダー", code: "#e1bee7" }, { name: "ターコイズ", code: "#008080" },
    { name: "ライム", code: "#c6ff00" }
];

colorBtn.addEventListener('click', () => {
    currentColors = [];
    colorBalls.forEach(ball => {
        const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        ball.style.backgroundColor = randomColor.code;
        currentColors.push(randomColor.code);

        ball.innerText = "";
        ball.classList.remove('placeholder');
        ball.style.transform = "scale(1.2)";
        setTimeout(() => { ball.style.transform = "scale(1.0)"; }, 200);
    });
});
