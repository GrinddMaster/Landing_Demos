const addItemHtml:string = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Matterport Sandbox Carousel</title>
<style>
  :root {
    --bg: #222;
    --card: #2b2b2b;
    --muted: #999;
    --accent: #f0c674;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  }

  #root {
    background-color: var(--bg);
    color: #eee;
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    overflow: hidden;
  }

  .container {
    width: 100%;
    max-width: 920px;
  }

  /* --- Original Add Button Styles --- */
  #carouselAddButton:hover {
    background: linear-gradient(135deg, #555555, #444444);
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.7);
  }

  #carouselAddButton:active {
    transform: translateY(1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  }

  /* --- Carousel Structure Styles --- */
  .carousel-card {
    background: var(--card);
    border-radius: 14px;
    min-height: 266px;
    max-width:348px ;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  }

  .carousel {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
  }

  .slides {
    display: flex;
    transition: transform 0.35s ease;
    will-change: transform;
  }

  .slide {
    min-width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .slide img {
    max-width: 264px;
    height: auto;
    max-height: 184px;
    border-radius: 6px;
    display: block;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  }

  /* --- Controls and Indicators --- */
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30%;
    padding-right: 30%;
  }

  .btn-flat {
    background: transparent;
    color: #ddd;
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0.2rem 0.35rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.6rem;
  }

  .btn-action {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 10px;
    cursor: pointer;
  }

  .carousel-indicators {
    display: flex;
    gap: 6px;
    margin-left: 0.5rem;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
  }

  .indicator.active {
    background: var(--accent);
    box-shadow: 0 0 8px rgba(240, 198, 116, 0.18);
  }

  /* add-to-cart button under each image */
  .add-to-cart {
    margin-top: 0;
    background: linear-gradient(135deg, #222, #333);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 0.2rem 0.4rem;
    color: beige;
    font-style: italic;
    font-size: 0.65rem;
  }

  /* --- Media Query --- */
  @media (min-width: 320px) {
    .slide {
      padding: 1.5rem;
    }
  }
</style>
</head>
<body>
<div id="root">
  <div class="container">
    <div class="carousel-card">
      <div id="matterport-sandbox" class="carousel" aria-roledescription="carousel">
        <div id="slides" class="slides">
          </div>
      </div>

      <div class="controls">
        <div>
          <button id="prev" class="btn-flat" aria-label="Previous">◀ Prev</button>
          <button id="next" class="btn-flat" aria-label="Next">Next ▶</button>
        </div>

        <div style="display:flex;align-items:center">
          <div class="carousel-indicators" id="indicators"></div>
        </div>
      </div>

    </div>

  </div>
</div>

<script>
    const products = [{
      id: 'mp-001' ?? null,
      name: 'Rug Classic' ?? null,
      img: 'https://i5.walmartimages.com/seo/Qunler-Large-Area-Rug-5ft-x-8ft-Shag-Living-Room-Rug-Indoor-Modern-Tie-dye-Area-Rugs-for-Bedroom-Rectangle-Fluffy-Home-Carpets-Gray_76732d4a-431f-4ea2-9e3e-ec28d1942847.235133e563a6d68753bd1d5c9c3103a9.jpeg' ?? null,
      quantity:0,
      price:30,
    }, {
      id: 'mp-002' ?? null,
      name: 'Modern Couch'?? null,
      img: 'https://storyathome.com/cdn/shop/products/1_e3c1726f-240d-4556-b980-0888a796d494.jpg?v=1681210809&width=1946',
      quantity:0,
      price:25,
    }, {
      id: 'mp-003'?? null,
      name: 'Floor Lamp'?? null,
      img: 'https://www.realsimple.com/thmb/Je4YQR_P0Afzp0xGkYIUP1L7p0k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rsp-product-allmodern-ovid-rug-hwortock-002-9a37761d830f4a74a0b361ab1641d595.jpeg',
      quantity:0,
      price:15,
    },
  ];

    const slidesEl = document.getElementById('slides');
    const indicatorsEl = document.getElementById('indicators');

    products.forEach((p, idx) => {
      // --- Create Slide ---
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.setAttribute('data-index', idx);

      // Image
      const img = document.createElement('img');
      img.alt = p.name;
      img.src = p.img;
      slide.appendChild(img);

      // Caption spacing
      const caption = document.createElement('div');
      caption.style.height = '0.5rem';
      slide.appendChild(caption);

      // Add-to-cart button
      const addBtn = document.createElement('button');
      addBtn.className = 'add-to-cart';
      addBtn.textContent = 'Add to cart';
      addBtn.id = 'carouselAddButton';
      addBtn.onclick = () => addToCartFor(idx);
      slide.appendChild(addBtn);

      slidesEl.appendChild(slide);

      // --- Create Indicator ---
      const ind = document.createElement('div');
      ind.className = 'indicator' + (idx === 0 ? ' active' : '');
      ind.onclick = () => goToSlide(idx);
      indicatorsEl.appendChild(ind);
    });

    let current = 0;

    function updateCarousel() {
      const offset = -current * 100;
      slidesEl.style.transform = \`translateX(\${offset}%)\`;

      // Update indicators
      Array.from(indicatorsEl.children).forEach((c, i) => c.classList.toggle('active', i === current));
    }

    function prev() {
      current = (current - 1 + products.length) % products.length;
      updateCarousel();
    }

    function next() {
      current = (current + 1) % products.length;
      updateCarousel();
    }

    function goToSlide(i) {
      current = i;
      updateCarousel();
    }

    document.getElementById('prev').addEventListener('click', prev);
    document.getElementById('next').addEventListener('click', next);

    function addToCartFor(index) {
      try {
        const productItem = products[index];
        window.on('message',(data)=>{console.log(data);console.log('Message successfully sent to sandbox');})

        if (typeof window.send === 'function') {
          window.send('addToCart', productItem);
          console.log('addToCart sent:', productItem);
        } else {
          // Fallback for when Matterport API is not present
          console.log('Would add to cart:', productItem);
        }
      } catch (e) {
        console.error(e);
      }
    }
    updateCarousel();
</script>
</body>
</html>
`;
export default addItemHtml;