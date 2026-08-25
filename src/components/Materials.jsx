import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const COLOUR_SWATCHES = {
    white:  '#f5f5f0',
    cream:  '#e0d0b0',
    grey:   '#8a8a8a',
    black:  '#1e1e1e',
    green:  '#4a7a5a',
    brown:  '#8b6347',
    blue:   '#5b7fa6',
    purple: '#8b6fa6',
}

const MATERIALS = [
    // ── Essential ──────────────────────────────────────────────────────────────────
    { id: 'black-mirrorlux',  name: 'Black Mirrorlux',  colours: ['black'],         sample_image: '/black-mirrorlux-sample.webp',  slab_image: '/black-mirrorlux-slab.webp'  },
    { id: 'blanco-mist',      name: 'Blanco Mist',      colours: ['white','grey'],         sample_image: '/blanco-mist-sample.webp',      slab_image: '/blanco-mist-slab.webp'      },
    { id: 'grey-mirrorlux',   name: 'Grey Mirrorlux',   colours: ['grey'],          sample_image: '/grey-mirrorlux-sample.webp',   slab_image: '/grey-mirrorlux-slab.webp'   },
    { id: 'grey-shimmer',     name: 'Grey Shimmer',     colours: ['grey'],          sample_image: '/grey-shimmer-sample.webp',     slab_image: '/grey-shimmer-slab.webp'     },
    { id: 'opus-white',       name: 'Opus White',       colours: ['white'],         sample_image: '/opus-white-sample.webp',       slab_image: '/opus-white-slab.webp'       },
    { id: 'white-almond',     name: 'White Almond',     colours: ['white'],         sample_image: '/white-almond-sample.webp',    slab_image: '/white-almond-slab.webp'     },
    { id: 'white-mirrorlux',  name: 'White Mirrorlux',  colours: ['white'],         sample_image: '/white-mirrorlux-sample.webp',  slab_image: '/white-mirrorlux-slab.webp'  },
    { id: 'white-shimmer',    name: 'White Shimmer',    colours: ['white'],         sample_image: '/white-shimmer-sample.webp',    slab_image: '/white-shimmer-slab.webp'    },

    // ── Classic ────────────────────────────────────────────────────────────────────
    { id: 'bianco-massa',     name: 'Bianco Massa',     colours: ['white', 'cream'],         sample_image: '/bianco-massa-sample.webp',     slab_image: '/bianco-massa-slab.webp'     },
    { id: 'bianco-venatino',  name: 'Bianco Venatino',  colours: ['white','grey'],         sample_image: '/bianco-venatino-sample.webp',  slab_image: '/bianco-venatino-slab.webp'  },
    { id: 'cararra-extra',    name: 'Cararra Extra',    colours: ['white','grey'],         sample_image: '/cararra-extra-sample.webp',    slab_image: '/cararra-extra-slab.webp'    },
    { id: 'desert-grey',      name: 'Desert Grey',      colours: ['grey'],          sample_image: '/desert-grey-sample.webp',      slab_image: '/desert-grey-slab.webp'      },
    { id: 'elegant-grey',     name: 'Elegant Grey',     colours: ['grey'],          sample_image: '/elegant-grey-sample.webp',     slab_image: '/elegant-grey-slab.webp'     },
    { id: 'midas-gold',       name: 'Midas Gold',       colours: ['white','grey','brown'],         sample_image: '/midas-gold-sample.webp',       slab_image: '/midas-gold-slab.webp'       },
    { id: 'pearl-white',      name: 'Pearl White',      colours: ['white'],         sample_image: '/pearl-white-sample.webp',      slab_image: '/pearl-white-slab.webp'      },
    { id: 'super-white-plus', name: 'Super White Plus', colours: ['white'],         sample_image: '/super-white-plus-sample.webp', slab_image: '/super-white-plus-slab.webp' },

    // ── Designer ───────────────────────────────────────────────────────────────────
    { id: 'calacatta-forte',  name: 'Calacatta Forte',  colours: ['white','grey','brown'],         sample_image: '/calacatta-forte-sample.webp',  slab_image: '/calacatta-forte-slab.webp'  },
    { id: 'carrara-minari',   name: 'Carrara Minari',   colours: ['white','grey','brown'],         sample_image: '/carrara-minari-sample.webp',   slab_image: '/carrara-minari-slab.webp'   },
    { id: 'glacier',          name: 'Glacier',          colours: ['white', 'brown'],         sample_image: '/glacier-sample.webp',          slab_image: '/glacier-slab.webp'          },
    { id: 'gracious',         name: 'Gracious',         colours: ['white', 'grey'], sample_image: '/gracious-sample.webp',         slab_image: '/gracious-slab.webp'         },
    { id: 'neo-calacatta',    name: 'Neo Calacatta',    colours: ['white','brown'],         sample_image: '/neo-calacatta-sample.webp',    slab_image: '/neo-calacatta-slab.webp'    },
    { id: 'permafrost',       name: 'Permafrost',       colours: ['white', 'grey'],         sample_image: '/permafrost-sample.webp',       slab_image: '/permafrost-slab.webp'       },
    { id: 'pietra-modena',    name: 'Pietra Modena',    colours: ['black','brown'],          sample_image: '/pietra-modena-sample.webp',    slab_image: '/pietra-modena-slab.webp'    },
    { id: 'rapture',          name: 'Rapture',          colours: ['white','grey','blue'],          sample_image: '/rapture-sample.webp',          slab_image: '/rapture-slab.webp'          },
    { id: 'roma',             name: 'Roma',             colours: ['brown'],          sample_image: '/roma-sample.webp',             slab_image: '/roma-slab.webp'             },
    { id: 'siberia',          name: 'Siberia',          colours: ['white', 'grey'], sample_image: '/siberia-sample.webp',          slab_image: '/siberia-slab.webp'          },
    { id: 'statuario-gold',   name: 'Statuario Gold',   colours: ['white','brown'],         sample_image: '/statuario-gold-sample.webp',   slab_image: '/statuario-gold-slab.webp'   },
    { id: 'statuario-grey',   name: 'Statuario Grey',   colours: ['white','grey'],          sample_image: '/statuario-grey-sample.webp',   slab_image: '/statuario-grey-slab.webp'   },

    // ── Premium ────────────────────────────────────────────────────────────────────
    { id: 'arctic',           name: 'Arctic',           colours: ['white','grey'],         sample_image: '/arctic-sample.webp',           slab_image: '/arctic-slab.webp'           },
    { id: 'aurora-dune',      name: 'Aurora Dune',      colours: ['cream'],         sample_image: '/aurora-dune-sample.webp',      slab_image: '/aurora-dune-slab.webp'      },
    { id: 'avenza',           name: 'Avenza',           colours: ['white','grey'], sample_image: '/avenza-sample.webp',           slab_image: '/avenza-slab.webp'           },
    { id: 'bianco-fontana',   name: 'Bianco Fontana',   colours: ['white','grey'],         sample_image: '/bianco-fontana-sample.webp',   slab_image: '/biancofontana-slab.webp'    },
    { id: 'borealis-green',   name: 'Borealis Green',   colours: ['green'],         sample_image: '/borealis-green-sample.webp',   slab_image: '/borealis-green-slab.webp'   },
    { id: 'calacatta-aurora', name: 'Calacatta Aurora', colours: ['white','grey','brown'],         sample_image: '/calacatta-aurora-sample.webp', slab_image: '/calacatta-aurora-slab.webp' },
    { id: 'calacatta-viola',  name: 'Calacatta Viola',  colours: ['white','purple'],         sample_image: '/calacatta-viola-sample.webp',  slab_image: '/calacatta-viola-slab.webp'  },
    { id: 'canaletto',        name: 'Canaletto',        colours: ['white','grey'],          sample_image: '/canaletto-sample.webp',        slab_image: '/canaletto-slab.webp'        },
    { id: 'capri',            name: 'Capri',            colours: ['white','brown'],         sample_image: '/capri-sample.webp',            slab_image: '/capri-slab.webp'            },
    { id: 'crema-fiore',      name: 'Crema Fiore',      colours: ['cream'],         sample_image: '/crema-fiore-sample.webp',      slab_image: '/crema-fiore-slab.webp'      },
    { id: 'lumen-ice',        name: 'Lumen Ice',        colours: ['cream'],         sample_image: '/lumen-ice-sample.webp',        slab_image: '/lumen-ice-slab.webp'        },
    { id: 'taj-mahal',        name: 'Taj Mahal',        colours: ['cream', 'white'], sample_image: '/taj-mahal-sample.webp',       slab_image: '/taj-mahal-slab.webp'        },
]

export default function Materials() {
    const [colourFilter, setColourFilter] = useState(null)
    const [activeImage, setActiveImage]   = useState(null)
    const navigate = useNavigate()

    function goToQuote() {
        navigate('/')
        setTimeout(() => {
            document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
    }

    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') setActiveImage(null)
        }
        if (activeImage) document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [activeImage])

    const visible = MATERIALS.filter(m => {
        if (colourFilter && !m.colours.includes(colourFilter)) return false
        return true
    })

    function toggleColour(colour) {
        setColourFilter(prev => prev === colour ? null : colour)
    }

    return (
        <section className="materials">

            <div className="materials__inner">
                <div className="materials__header">
                    <p className="section__eyebrow">Worktops</p>
                    <h1 className="section__heading">Our Materials</h1>
                </div>

                <div className="materials__layout">
                    <aside className="materials__sidebar">
                        <div className="materials__filter-group">
                            <span className="materials__filter-label">Colour</span>
                            <div className="materials__filter-pills">
                                {Object.entries(COLOUR_SWATCHES).map(([colour, hex]) => (
                                    <button
                                        key={colour}
                                        className={`materials__pill${colourFilter === colour ? ' materials__pill--active' : ''}`}
                                        onClick={() => toggleColour(colour)}
                                    >
                                        <span className="materials__swatch" style={{ background: hex }} />
                                        {colour.charAt(0).toUpperCase() + colour.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="materials__count">
                            {visible.length} of {MATERIALS.length} materials
                        </p>
                    </aside>

                    <div className="materials__content">
                        {visible.length === 0 ? (
                            <p className="materials__empty">No materials match your filters.</p>
                        ) : (
                            <div className="materials__grid">
                                {visible.map(m => (
                                    <div className="materials__card" key={m.id}>
                                        <div
                                            className="materials__img-wrap"
                                            onClick={() => setActiveImage(m.slab_image)}
                                        >
                                            <img
                                                src={m.sample_image}
                                                alt={m.name}
                                                loading="lazy"
                                            />
                                            <div className="materials__img-overlay">
                                                <span>View Full Slab</span>
                                            </div>
                                        </div>
                                        <div className="materials__card-info">
                                            <span className="materials__card-name">{m.name}</span>
                                            <div className="materials__card-meta">
                                                <div className="materials__colour-tags">
                                                    {m.colours.map(c => (
                                                        <span key={c} className="materials__colour-tag">
                                                            <span
                                                                className="materials__swatch materials__swatch--sm"
                                                                style={{ background: COLOUR_SWATCHES[c] }}
                                                            />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className="materials__quote-btn" onClick={goToQuote}>
                                                Get a Quote
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {activeImage && (
                <div className="lightbox" onClick={() => setActiveImage(null)}>
                    <button className="lightbox__close" onClick={() => setActiveImage(null)}>✕</button>
                    <img
                        className="lightbox__img"
                        src={activeImage}
                        alt=""
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

        </section>
    )
}
