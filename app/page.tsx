'use client';

import { FormEvent, MouseEvent, useState } from 'react';

type Mode = 'rent' | 'buy';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type Property = {
  id: number;
  name: string;
  city: string;
  kind: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  image: string;
  label?: string;
};

const featuredLocations = [
  'Deira',
  'Dubai Marina',
  'Downtown Dubai',
  'Jumeirah',
  'Business Bay',
  'Palm Jumeirah',
  'Ras Al Khaimah',
];

const properties: Property[] = [
  {
    id: 1,
    name: 'Light-filled home with a garden',
    city: 'Austin, Texas',
    kind: 'House',
    bedrooms: 3,
    bathrooms: 2,
    area: 1840,
    price: 3650,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
    label: 'Guest favorite',
  },
  {
    id: 2,
    name: 'Quiet apartment above the city',
    city: 'Brooklyn, New York',
    kind: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1260,
    price: 785000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'Modern retreat among the trees',
    city: 'Portland, Oregon',
    kind: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 2310,
    price: 4290,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85',
    label: 'New this week',
  },
  {
    id: 4,
    name: 'A calm place to land',
    city: 'Denver, Colorado',
    kind: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 890,
    price: 2180,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Open-plan living, close to everything',
    city: 'San Diego, California',
    kind: 'House',
    bedrooms: 3,
    bathrooms: 2,
    area: 1760,
    price: 925000,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'The Sunday-morning kind of home',
    city: 'Nashville, Tennessee',
    kind: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 2480,
    price: 5180,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85',
    label: 'Open house',
  },
];

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <a
      className="brand"
      href="#home"
      aria-label="CraftiProp home"
      onClick={onClick ? (event) => {
        event.preventDefault();
        onClick();
      } : undefined}
    >
      <img className="brand-mark" src={`${basePath}/favicons/favicon-32x32.png`} alt="" aria-hidden="true" />
      <span>crafti<span>prop</span></span>
    </a>
  );
}

function SiteHeader({
  onHome,
  onNavigate,
  onStartSearching,
}: {
  onHome: () => void;
  onNavigate: (section: string) => boolean;
  onStartSearching: () => void;
}) {
  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, section: string) => {
    if (onNavigate(section)) event.preventDefault();
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <BrandMark onClick={onHome} />
        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#homes" onClick={(event) => handleNavigation(event, 'homes')}>Homes</a>
          <a href="#neighborhoods" onClick={(event) => handleNavigation(event, 'neighborhoods')}>Neighborhoods</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-login" href="#sign-in">Sign in</a>
          <button className="dark-pill" onClick={onStartSearching}>Start searching <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.4" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'is-filled' : ''}>
      <path d="M20.8 8.8c0 4.1-8.8 10.1-8.8 10.1S3.2 12.9 3.2 8.8a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z" />
    </svg>
  );
}

function Landing({ onChoose }: { onChoose: (mode: Mode) => void }) {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  return (
    <main className="landing" id="home">
      <section className="welcome-hero" aria-labelledby="welcome-title">
        <span className="eyebrow"><span className="new-badge">NEW</span> A better way to find home</span>
        <h1 id="welcome-title">Find a place for<br className="desktop-break" /> what comes next.</h1>
        <p>Thoughtful homes, a clearer search, and a little more room to find your fit.</p>
        <div className="demo-frame" id="homes">
          <div className="demo-window">
            <div className="demo-window-bar"><span /><span /><span /><b>craftiprop.com / discover</b></div>
            <div className="demo-scene" role="img" aria-label="Illustration of a contemporary home with greenery and warm evening light">
              <span className="scene-sun" />
              <span className="scene-hills" />
              <span className="scene-ground" />
              <span className="scene-home">
                <span className="scene-window scene-window-wide" />
                <span className="scene-window scene-window-tall" />
                <span className="scene-door" />
                <span className="scene-canopy" />
              </span>
              <span className="scene-path" />
              <span className="scene-plant scene-plant-left" />
              <span className="scene-plant scene-plant-right" />
            </div>
            <div className="demo-search"><span>⌕</span><span>Find a home that feels right</span><i>Explore</i></div>
          </div>
        </div>
        <div className="choice-actions" aria-label="Choose how you want to find a home">
          <button className="outline-pill" onClick={() => onChoose('rent')}>Rent a home <span aria-hidden="true">↗</span></button>
          <button className="outline-pill" onClick={() => onChoose('buy')}>Purchase a home <span aria-hidden="true">↗</span></button>
        </div>
      </section>

      <section className="trust-section" id="neighborhoods" aria-labelledby="locations-heading">
        <div className="location-intro">
          <span className="section-kicker">UAE / LOCATIONS</span>
          <h2 id="locations-heading">Explore homes across the UAE.</h2>
        </div>
        <div className="location-marquee">
          <div className={`location-marquee-track${isMarqueePaused ? ' is-paused' : ''}`}>
            <ul className="location-list" aria-label="Featured UAE locations">
              {featuredLocations.map((location) => (
                <li key={location} className="location-pill"><span>{location}</span></li>
              ))}
            </ul>
            <ul className="location-list location-list-duplicate" aria-hidden="true">
              {featuredLocations.map((location) => (
                <li key={`${location}-duplicate`} className="location-pill"><span>{location}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="marquee-toggle"
          type="button"
          aria-label={isMarqueePaused ? 'Resume location marquee' : 'Pause location marquee'}
          aria-pressed={isMarqueePaused}
          onClick={() => setIsMarqueePaused((paused) => !paused)}
        >
          <span aria-hidden="true">{isMarqueePaused ? '▶' : 'Ⅱ'}</span>
          {isMarqueePaused ? 'Resume locations' : 'Pause locations'}
        </button>
      </section>

      <section className="uae-promo" aria-labelledby="uae-promo-heading">
        <div className="uae-promo-copy">
          <span className="uae-promo-kicker">CRAFTIPROP / MADE FOR THE UAE</span>
          <h2 id="uae-promo-heading">Your next move, a little closer.</h2>
          <p>Find a place that feels right, with a clearer view of the neighborhoods and homes that make the UAE feel like yours.</p>
          <button className="uae-promo-cta" type="button" onClick={() => onChoose('rent')}>
            Explore rentals <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="uae-promo-benefits" aria-label="Ways CraftiProp helps you find a home">
          <article className="uae-benefit">
            <span className="uae-benefit-icon" aria-hidden="true">♡</span>
            <div>
              <h3>Keep the good ones close</h3>
              <p>Save homes worth coming back to.</p>
            </div>
          </article>
          <article className="uae-benefit">
            <span className="uae-benefit-icon" aria-hidden="true">↗</span>
            <div>
              <h3>Stay in the know</h3>
              <p>Keep an eye on homes and prices.</p>
            </div>
          </article>
          <article className="uae-benefit">
            <span className="uae-benefit-icon" aria-hidden="true">⌖</span>
            <div>
              <h3>Get to know the area</h3>
              <p>Explore the UAE, one neighborhood at a time.</p>
            </div>
          </article>
        </div>
        <div className="uae-phone-wrap" aria-label="CraftiProp home search preview">
          <div className="uae-phone">
            <div className="uae-phone-speaker" />
            <div className="uae-phone-screen">
              <div className="uae-phone-header"><span>crafti<span>prop</span></span><span className="uae-phone-avatar">C</span></div>
              <p className="uae-phone-greeting">A good place to begin</p>
              <div className="uae-phone-search"><span aria-hidden="true">⌕</span> Dubai, UAE</div>
              <div className="uae-phone-property-art" aria-hidden="true">
                <span className="uae-art-sun" />
                <span className="uae-art-tower uae-art-tower-back" />
                <span className="uae-art-tower uae-art-tower-front" />
                <span className="uae-art-ground" />
              </div>
              <div className="uae-phone-listing">
                <span className="uae-phone-label">EXPLORE THE UAE</span>
                <strong>Find a neighborhood<br />that feels like you.</strong>
                <span className="uae-phone-link">Browse nearby homes <span aria-hidden="true">→</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer" id="neighborhoods">
        <BrandMark />
        <span>Find your place in the world.</span>
        <span>© 2026 CraftiProp</span>
      </footer>
    </main>
  );
}

function Explore({ mode, onModeChange }: { mode: Mode; onModeChange: (mode: Mode) => void }) {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('any');
  const [kind, setKind] = useState('any');
  const [appliedLocation, setAppliedLocation] = useState('');
  const [appliedBudget, setAppliedBudget] = useState('any');
  const [appliedKind, setAppliedKind] = useState('any');
  const [favorites, setFavorites] = useState<number[]>([]);

  const money = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

  const visibleProperties = properties.filter((property) => {
    const matchesMode = mode === 'rent' ? property.price < 10000 : property.price >= 10000;
    const matchesLocation = property.city.toLowerCase().includes(appliedLocation.trim().toLowerCase());
    const matchesKind = appliedKind === 'any' || property.kind === appliedKind;
    const matchesBudget = appliedBudget === 'any'
      || (appliedBudget === 'low' && property.price < (mode === 'rent' ? 3000 : 500000))
      || (appliedBudget === 'mid' && property.price >= (mode === 'rent' ? 3000 : 500000) && property.price < (mode === 'rent' ? 4500 : 900000))
      || (appliedBudget === 'high' && property.price >= (mode === 'rent' ? 4500 : 900000));
    return matchesMode && matchesLocation && matchesKind && matchesBudget;
  });

  function applySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedLocation(location);
    setAppliedBudget(budget);
    setAppliedKind(kind);
  }

  function toggleFavorite(id: number) {
    setFavorites((current) => current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id]);
  }

  return (
    <main className="explore-page" id="browse">
      <div className="explore-content">
        <div className="browse-heading">
          <div>
            <span className="section-kicker">CRAFTIPROP / {mode === 'rent' ? 'RENTALS' : 'FOR SALE'}</span>
            <h1>{mode === 'rent' ? 'Find a place to land.' : 'Find a place to call yours.'}</h1>
            <p>{mode === 'rent' ? 'Good homes for the everyday you’re building.' : 'A thoughtful start to your next chapter.'}</p>
          </div>
          <button className="switch-mode" onClick={() => onModeChange(mode === 'rent' ? 'buy' : 'rent')}>
            Looking to {mode === 'rent' ? 'buy' : 'rent'}? <span aria-hidden="true">↗</span>
          </button>
        </div>

        <form className="search-capsule" id="search-homes" onSubmit={applySearch}>
          <label className="search-field location-field">
            <span>Where</span>
            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Search city or neighborhood" />
          </label>
          <label className="search-field budget-field">
            <span>{mode === 'rent' ? 'Monthly budget' : 'Price range'}</span>
            <select value={budget} onChange={(event) => setBudget(event.target.value)}>
              <option value="any">Any budget</option>
              <option value="low">{mode === 'rent' ? 'Under $3,000' : 'Under $500,000'}</option>
              <option value="mid">{mode === 'rent' ? '$3,000–$4,500' : '$500,000–$900,000'}</option>
              <option value="high">{mode === 'rent' ? '$4,500+' : '$900,000+'}</option>
            </select>
          </label>
          <label className="search-field type-field">
            <span>Home type</span>
            <select value={kind} onChange={(event) => setKind(event.target.value)}>
              <option value="any">Any type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
          </label>
          <button className="search-submit" type="submit" aria-label="Search homes"><SearchIcon /></button>
        </form>

        <div className="listing-toolbar">
          <div>
            <h2>{appliedLocation ? `Homes in ${appliedLocation}` : mode === 'rent' ? 'Places to rent' : 'Homes for sale'}</h2>
            <span>{visibleProperties.length} thoughtful finds</span>
          </div>
          <button className="filter-button" type="button" onClick={() => {
            setLocation('');
            setBudget('any');
            setKind('any');
            setAppliedLocation('');
            setAppliedBudget('any');
            setAppliedKind('any');
          }}>Reset filters</button>
        </div>

        {visibleProperties.length > 0 ? (
          <div className="listing-grid">
            {visibleProperties.map((property) => {
              const isFavorite = favorites.includes(property.id);
              return (
                <article className="listing-card" key={property.id}>
                  <div className="listing-image-wrap">
                    <img src={property.image} alt={property.name} className="listing-image" />
                    {property.label && <span className="listing-badge">{property.label}</span>}
                    <button
                      className={isFavorite ? 'favorite-button favorite-active' : 'favorite-button'}
                      type="button"
                      aria-label={isFavorite ? `Remove ${property.name} from saved homes` : `Save ${property.name}`}
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(property.id)}
                    ><HeartIcon filled={isFavorite} /></button>
                  </div>
                  <div className="listing-details">
                    <div className="listing-title-row"><h3>{property.name}</h3><span className="rating"><span aria-hidden="true">★</span> 4.9</span></div>
                    <p>{property.city}</p>
                    <p>{property.bedrooms} beds · {property.bathrooms} baths · {property.area.toLocaleString()} sq ft</p>
                    <div className="listing-price"><strong>{money(property.price)}</strong><span>{mode === 'rent' ? ' / month' : ' asking price'}</span></div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-results">
            <span className="empty-mark" aria-hidden="true">⌂</span>
            <h2>No homes match that search yet.</h2>
            <p>Try another neighborhood or broaden your filters.</p>
            <button className="dark-pill" onClick={() => {
              setLocation('');
              setBudget('any');
              setKind('any');
              setAppliedLocation('');
              setAppliedBudget('any');
              setAppliedKind('any');
            }}>Clear filters</button>
          </div>
        )}

        <footer className="explore-footer">
          <BrandMark />
          <span>Good moves start here.</span>
          <span>© 2026 CraftiProp</span>
        </footer>
      </div>
    </main>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode | null>(null);

  function chooseMode(nextMode: Mode) {
    setMode(nextMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function navigateToSection(section: string) {
    if (mode === null) return false;

    setMode(null);
    window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
    return true;
  }

  function startSearching() {
    if (mode === null) {
      chooseMode('rent');
      return;
    }
    document.getElementById('search-homes')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <SiteHeader
        onHome={() => {
          setMode(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={navigateToSection}
        onStartSearching={startSearching}
      />
      {mode
        ? <Explore mode={mode} onModeChange={setMode} />
        : <Landing onChoose={chooseMode} />}
    </>
  );
}
