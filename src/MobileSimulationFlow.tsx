import { useState, useEffect, useRef } from 'react';
import BrandWaves from './BrandWaves';
import tulogo from './assets/tulogo.png';

// ==========================================
// 1. DATA MOCKS Y UTILIDADES
// ==========================================



// ==========================================
// 2. DATA MOCKS Y UTILIDADES
// ==========================================
export interface Size {
    id: string; name: string; dimensions: string; price: string;
    width: number; height: number; gradient: string; category: string;
    isCollage: boolean; isOverlay: boolean; isCalendar: boolean;
    isPhotoStrip: boolean; isSpotify: boolean; isAlbum: boolean;
}

const getGradientForSku = (sku: string) => {
    switch (sku) {
        case 'kiosco': case 'kiosco_collage': return 'from-pink-400 via-red-500 to-pink-300';
        case 'medium': case 'medium_collage': return 'from-teal-400 via-blue-500 to-blue-600';
        case 'large': case 'large_collage': return 'from-purple-300 via-pink-300 to-purple-400';
        case 'square-small': case 'square_small_collage': return 'from-orange-300 via-yellow-400 to-red-400';
        case 'square-large': case 'square_large_collage': return 'from-indigo-400 via-purple-500 to-pink-400';
        case 'panoramic': case 'panoramic_collage': return 'from-lime-400 via-green-400 to-lime-600';
        case 'photostrip_6x8_pack4': return 'from-white via-slate-50 to-white';
        case 'overlay_10x15': case 'overlay_10x15_lab': return 'from-purple-500 via-pink-500 to-orange-400';
        case 'overlay_13x18': return 'from-blue-500 via-indigo-500 to-purple-500';
        case 'overlay_15x20': case 'overlay_15x21_lab': return 'from-emerald-300 via-teal-500 to-cyan-400';
        case 'overlay_20x30_lab': return 'from-rose-500 via-pink-500 to-fuchsia-500';
        case 'calendar_10x15': case 'calendar_10x15_lab': return 'from-cyan-500 via-blue-500 to-indigo-500';
        case 'calendar_15x20': case 'calendar_15x20_lab': return 'from-yellow-200 via-orange-500 to-amber-400';
        case 'calendar_20x30_lab': return 'from-lime-400 via-green-400 to-lime-600';
        // LABORATORIO LOCAL
        case 'PIC1015L': case 'collage_10x15_lab': return 'from-pink-400 via-red-500 to-pink-300';
        case 'PIC1318L': case 'collage_13x18_lab': return 'from-orange-300 via-yellow-400 to-red-400';
        case 'PIC1521L': case 'collage_15x21_lab': return 'from-indigo-400 via-purple-500 to-pink-400';
        case 'PIC2020L': case 'collage_20x20_lab': return 'from-teal-400 via-blue-500 to-blue-600';
        case 'PIC2025L': case 'collage_20x25_lab': return 'from-purple-300 via-pink-300 to-purple-400';
        case 'PIC2030L': case 'collage_20x30_lab': return 'from-lime-400 via-green-400 to-lime-600';
        // ALBUMES
        case 'album_10x15_instant': return 'from-purple-600 via-pink-600 to-pink-500';
        case 'album_15x15_instant': return 'from-blue-600 via-indigo-600 to-cyan-500';
        case 'album_15x20_instant': return 'from-amber-400 via-orange-600 to-red-600';
        case 'album_20x20_lab': return 'from-emerald-600 via-teal-600 to-green-600';
        case 'album_20x30_lab': return 'from-slate-700 via-slate-800 to-black';
        case 'spotify_scan_10x15': return 'from-green-400 via-green-500 to-green-600';
        case 'secret_qr_10x15': return 'from-indigo-600 via-purple-600 to-slate-800';
        case 'photo_split': return 'from-white via-slate-50 to-white';
        default: return 'from-gray-300 via-gray-400 to-gray-500';
    }
};

const RAW_PRODUCTS = [
    // INSTANT - Singles
    { sku: 'kiosco', name: 'Foto Kiosco', description: '10x15 cm (4x6 pulgadas)', price: '1000', width: 15, height: 10, category: 'instant', requiresEven: true },
    { sku: 'medium', name: 'Foto Kiosco', description: '13x18 cm (5x7 pulgadas)', price: '1500', width: 18, height: 13, category: 'instant' },
    { sku: 'large', name: 'Foto Kiosco', description: '15x20 cm (6x8 pulgadas)', price: '2000', width: 20, height: 15, category: 'instant' },
    { sku: 'square-small', name: 'Foto Kiosco', description: '13x13 cm (5x5 pulgadas)', price: '1200', width: 13, height: 13, category: 'instant' },
    { sku: 'square-large', name: 'Foto Kiosco', description: '15x15 cm (6x6 pulgadas)', price: '1800', width: 15, height: 15, category: 'instant' },
    { sku: 'panoramic', name: 'Foto Kiosco', description: '15 x 35 (6x14 pulgadas)', price: '3000', width: 35, height: 15, category: 'instant' },

    // INSTANT - Collages
    { sku: 'kiosco_collage', name: 'Collage 10x15', description: '10x15 cm (Hasta 8 fotos)', price: '1500', width: 15, height: 10, category: 'instant', isCollage: true },
    { sku: 'medium_collage', name: 'Collage 13x18', description: '13x18 cm (Hasta 8 fotos)', price: '2000', width: 18, height: 13, category: 'instant', isCollage: true },
    { sku: 'large_collage', name: 'Collage 15x20', description: '15x20 cm (Hasta 8 fotos)', price: '2500', width: 20, height: 15, category: 'instant', isCollage: true },
    { sku: 'square_small_collage', name: 'Collage 13x13', description: '13x13 cm (Hasta 8 fotos)', price: '1800', width: 13, height: 13, category: 'instant', isCollage: true },
    { sku: 'square_large_collage', name: 'Collage 15x15', description: '15x15 cm (Hasta 8 fotos)', price: '2200', width: 15, height: 15, category: 'instant', isCollage: true },
    { sku: 'panoramic_collage', name: 'Collage 15x35', description: '15x35 cm (Hasta 8 fotos)', price: '3500', width: 35, height: 15, category: 'instant', isCollage: true },

    // INSTANT - overlays, photostrip, calendars
    { sku: 'photostrip_6x8_pack4', name: 'Photo Strip - Marca Páginas (4 unidades)', description: '4 tiras de 2x6" en una hoja de 6x8"', price: '2500', width: 20, height: 15, category: 'instant', isPhotoStrip: true },
    { sku: 'overlay_10x15', name: 'Recuerdo 10x15', description: '10x15 cm', price: '1500', width: 15, height: 10, category: 'instant', isOverlay: true },
    { sku: 'overlay_13x18', name: 'Recuerdo 13x18', description: '13x18 cm', price: '2000', width: 18, height: 13, category: 'instant', isOverlay: true },
    { sku: 'overlay_15x20', name: 'Recuerdo 15x20', description: '15x20 cm', price: '2500', width: 20, height: 15, category: 'instant', isOverlay: true },
    { sku: 'calendar_10x15', name: 'Calendario 10x15', description: '10x15 cm - Horizontal', price: '2000', width: 15, height: 10, category: 'instant', isCalendar: true },
    { sku: 'calendar_15x20', name: 'Calendario 15x20', description: '15x20 cm - Vertical', price: '3000', width: 15, height: 20, category: 'instant', isCalendar: true },

    // INSTANT - Albums
    { sku: 'album_10x15_instant', name: 'Álbum 10x15', description: 'Fotolibro Instantáneo', price: '45000', width: 15, height: 10, category: 'album_instant', isAlbum: true },
    { sku: 'album_15x15_instant', name: 'Álbum 15x15', description: 'Fotolibro Instantáneo', price: '55000', width: 15, height: 15, category: 'album_instant', isAlbum: true },
    { sku: 'album_15x20_instant', name: 'Álbum 15x20', description: 'Fotolibro Instantáneo', price: '65000', width: 20, height: 15, category: 'album_instant', isAlbum: true },

    // UNIQUE (only shows in 'instant' category as well)
    { sku: 'spotify_scan_10x15', name: 'Spotify Scan', description: 'Placa musical personalizada 10x15 cm', price: '3500', width: 10, height: 15, category: 'unique', isSpotify: true },
    { sku: 'secret_qr_10x15', name: 'Foto Mensaje Oculto', description: 'Foto con código QR secreto 10x15 cm', price: '1500', width: 10, height: 15, category: 'unique' },
    { sku: 'photo_split', name: 'Photo Split', description: 'Lienzos multipanel decorativos', price: '3500', width: 15, height: 10, category: 'unique' },

    // LAB - Singles
    { sku: 'PIC1015L', name: 'Foto Laboratorio', description: '10x15 cm', price: '1000', width: 15, height: 10, category: 'lab' },
    { sku: 'PIC1318L', name: 'Foto Laboratorio', description: '13x18 cm', price: '1500', width: 18, height: 13, category: 'lab' },
    { sku: 'PIC1521L', name: 'Foto Laboratorio', description: '15x21 cm', price: '2000', width: 21, height: 15, category: 'lab' },
    { sku: 'PIC2020L', name: 'Foto Laboratorio', description: '20x20 cm', price: '2500', width: 20, height: 20, category: 'lab' },
    { sku: 'PIC2025L', name: 'Foto Laboratorio', description: '20x25 cm', price: '3000', width: 25, height: 20, category: 'lab' },
    { sku: 'PIC2030L', name: 'Foto Laboratorio', description: '20x30 cm', price: '3500', width: 30, height: 20, category: 'lab' },

    // LAB - Collages
    { sku: 'collage_10x15_lab', name: 'Collage 10x15 Lab', description: '10x15 cm (Laboratorio)', price: '1800', width: 15, height: 10, category: 'lab', isCollage: true },
    { sku: 'collage_13x18_lab', name: 'Collage 13x18 Lab', description: '13x18 cm (Laboratorio)', price: '2500', width: 18, height: 13, category: 'lab', isCollage: true },
    { sku: 'collage_15x21_lab', name: 'Collage 15x21 Lab', description: '15x21 cm (Laboratorio)', price: '3000', width: 21, height: 15, category: 'lab', isCollage: true },
    { sku: 'collage_20x20_lab', name: 'Collage 20x20 Lab', description: '20x20 cm (Laboratorio)', price: '3500', width: 20, height: 20, category: 'lab', isCollage: true },
    { sku: 'collage_20x25_lab', name: 'Collage 20x25 Lab', description: '20x25 cm (Laboratorio)', price: '4000', width: 25, height: 20, category: 'lab', isCollage: true },
    { sku: 'collage_20x30_lab', name: 'Collage 20x30 Lab', description: '20x30 cm (Laboratorio)', price: '4500', width: 30, height: 20, category: 'lab', isCollage: true },

    // LAB - overlays, calendars
    { sku: 'overlay_10x15_lab', name: 'Foto Overlay 10x15', description: '10x15 cm', price: '2000', width: 15, height: 10, category: 'lab', isOverlay: true },
    { sku: 'overlay_15x21_lab', name: 'Foto Overlay 15x21', description: '15x21 cm', price: '3000', width: 21, height: 15, category: 'lab', isOverlay: true },
    { sku: 'overlay_20x30_lab', name: 'Foto Overlay 20x30', description: '20x30 cm', price: '4500', width: 30, height: 20, category: 'lab', isOverlay: true },
    { sku: 'calendar_10x15_lab', name: 'Calendario 10x15', description: '10x15 cm (Laboratorio)', price: '2500', width: 15, height: 10, category: 'lab', isCalendar: true },
    { sku: 'calendar_15x20_lab', name: 'Calendario 15x20', description: '15x20 cm (Laboratorio)', price: '3500', width: 20, height: 15, category: 'lab', isCalendar: true },
    { sku: 'calendar_20x30_lab', name: 'Calendario 20x30', description: '20x30 cm (Laboratorio)', price: '5000', width: 30, height: 20, category: 'lab', isCalendar: true },

    // LAB - Albums
    { sku: 'album_20x20_lab', name: 'Álbum Pro 20x20', description: 'Fotolibro Laboratorio', price: '85000', width: 20, height: 20, category: 'album_lab', isAlbum: true },
    { sku: 'album_20x30_lab', name: 'Álbum Pro 20x30', description: 'Fotolibro Laboratorio', price: '110000', width: 30, height: 20, category: 'album_lab', isAlbum: true },
];

const MOCK_SIZES: Size[] = RAW_PRODUCTS.map(p => ({
    id: p.sku, name: p.name, dimensions: p.description, price: p.price, width: p.width, height: p.height,
    gradient: getGradientForSku(p.sku), category: p.category,
    isCollage: !!p.isCollage, isOverlay: !!p.isOverlay,
    isCalendar: !!p.isCalendar, isPhotoStrip: !!p.isPhotoStrip,
    isSpotify: !!p.isSpotify, isAlbum: !!p.isAlbum,
}));

// Mock Thumbnail Helper
const PhotoStripThumbnailMock = () => (
    <div className="w-full h-full bg-white flex flex-col p-1 gap-1 border border-gray-200 shadow-sm rounded-sm">
        <div className="flex-1 bg-gray-200"></div><div className="flex-1 bg-gray-300"></div><div className="flex-1 bg-gray-200"></div>
    </div>
);

// ==========================================
// 3. PANTALLA DE CATEGORÍAS (Mock Adaptado a Móvil)
// ==========================================
const CategoryScreenMock = ({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => { setIsLoaded(true); }, []);

    return (
        <div className={`h-full w-full px-4 py-8 overflow-y-auto no-scrollbar transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} relative`}>
            <div className="flex flex-col h-full z-10 relative">
                <div className="pt-2 mb-2 flex flex-col items-center justify-center text-center relative z-10">
                    <div className="mb-2">
                        <img src={tulogo} alt="LocalFoto Logo" className="w-24 h-auto object-contain animate-[float_3s_ease-in-out_infinite] drop-shadow-lg" />
                    </div>
                    <h2 className="text-xl text-[#2D3A52] font-extrabold mb-1 tracking-tight">Bienvenido a LocalFoto</h2>
                    <p className="text-[13px] text-[#2D3A52]/70">¿Qué deseas imprimir hoy?</p>
                </div>

                <div className="flex-1 flex flex-col gap-3 w-full pb-3">
                    {/* Foto Instantánea */}
                    <div className="flex flex-col items-center p-5 bg-white rounded-3xl shadow-xl w-full border border-gray-100 flex-1 justify-center relative overflow-hidden group hover:shadow-2xl transition-all cursor-pointer" onClick={() => onCategorySelect('instant')}>
                        <div className="absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" style={{ backgroundColor: 'var(--brand-500)' }}></div>
                        <div className="h-10 w-10 shrink-0 text-white rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-md" style={{ backgroundColor: 'var(--brand-500)' }}>
                            <i className="ri-camera-fill text-xl"></i>
                        </div>
                        <h2 className="text-base font-bold text-[#2D3A52] mb-1 text-center">Fotografía Instantánea</h2>
                        <p className="text-[#2D3A52]/60 mb-3 text-[11px] text-center px-4 leading-relaxed">Imprime tus fotos favoritas al instante con la mejor calidad fotográfica profesional</p>
                        <button className="px-6 py-2 bg-white border-2 font-black rounded-full text-[11px] transition-all flex items-center gap-3 hover:bg-gray-50 z-10 transform group-hover:scale-105" style={{ color: 'var(--brand-600)', borderColor: 'var(--brand-100)' }}>
                            EMPEZAR AHORA
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>

                    {/* Laboratorio */}
                    <div className="flex flex-col items-center p-5 bg-white rounded-3xl shadow-xl w-full border border-gray-100 flex-1 justify-center relative overflow-hidden group hover:shadow-2xl transition-all cursor-pointer" onClick={() => onCategorySelect('lab')}>
                        <div className="absolute inset-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.08]" style={{ backgroundColor: 'var(--brand-500)' }}></div>
                        <div className="h-10 w-10 shrink-0 text-white rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-md" style={{ backgroundColor: 'var(--brand-500)' }}>
                            <i className="ri-printer-cloud-fill text-xl"></i>
                        </div>
                        <h2 className="text-base font-bold text-[#2D3A52] mb-1 text-center">Laboratorio Local</h2>
                        <p className="text-[#2D3A52]/60 mb-3 text-[11px] text-center px-4 leading-relaxed">Pide tus copias en línea y recógelas en menos de 1 hora</p>
                        <button className="px-6 py-2 bg-white border-2 font-black rounded-full text-[11px] transition-all flex items-center gap-3 hover:bg-gray-50 z-10 transform group-hover:scale-105" style={{ color: 'var(--brand-600)', borderColor: 'var(--brand-100)' }}>
                            PEDIR COPIAS
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ==========================================
// 4. PANTALLA DE SELECCIÓN DE TAMAÑOS
// ==========================================
const SizeSelectionMock = ({ category, onBack }: { category: string; onBack: () => void }) => {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [mode, setMode] = useState<'single' | 'collage' | 'overlay' | 'album' | 'unique'>('single');
    const scrollRef = useRef<HTMLDivElement>(null);
    const modesOrder = ['single', 'collage', 'overlay', 'album', 'unique'];
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        const filtered = MOCK_SIZES.filter(p => {
            if (category === 'instant') return p.category === 'instant' || p.category === 'album_instant' || p.category === 'unique';
            if (category === 'lab') return p.category === 'lab' || p.category === 'album_lab';
            return false;
        });
        setSizes(filtered);
    }, [category]);

    const SizePreview = ({ size }: { size: Size }) => {
        const isMobile = true;
        const scale = isMobile ? 5.5 : 7;
        const width = size.width * scale;
        const height = size.height * scale;
        const isOverlay = size.isOverlay;

        const isSplit = size.id === 'photo_split' || size.id.includes('split');
        const hasNoWrapper = size.isPhotoStrip || isSplit;

        const finalWidth = isSplit ? 180 : width;
        const finalHeight = isSplit ? 120 : height;

        return (
            <div className="flex justify-center items-center">
                <div className="relative group">
                    <div
                        className={`transition-all duration-500 ease-out relative overflow-hidden ${hasNoWrapper ? '' : 'border-4 border-white shadow-lg'} hover:scale-110`}
                        style={{
                            width: `${finalWidth}px`,
                            height: `${finalHeight}px`,
                            maxWidth: isMobile ? '180px' : '300px',
                            maxHeight: isMobile ? '180px' : '300px'
                        }}
                    >
                        <div className={`w-full h-full ${hasNoWrapper ? 'bg-transparent' : `bg-gradient-to-br ${size.gradient}`} relative flex items-center justify-center`}>
                            {size.isPhotoStrip ? (
                                <div className="relative w-full h-full">
                                    <PhotoStripThumbnailMock />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: 'collageShimmer 3s ease-in-out 0.8s infinite' }} />
                                </div>
                            ) : size.isCollage ? (
                                <div className="w-full h-full absolute inset-0 overflow-hidden">
                                    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-[3px] p-[1px] bg-white">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div key={i} className={`relative overflow-hidden bg-gradient-to-br ${size.gradient}`}>
                                                {(i === 1 || i === 2) && (
                                                    <div className="absolute inset-0 bg-white/50 z-0" />
                                                )}
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent z-10"
                                                    style={{ animation: `collageShimmer 2.8s ease-in-out ${i * 0.12}s infinite` }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : size.isCalendar ? (
                                <div className="flex flex-col items-center justify-center p-2 text-center w-full h-full">
                                    <div className="absolute inset-x-2 top-2 h-2 bg-white/20 rounded-t-sm"></div>
                                    <i className="ri-calendar-event-line text-white text-3xl drop-shadow-md z-10"></i>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{ animation: 'collageShimmer 3s ease-in-out infinite' }} />
                                </div>
                            ) : isOverlay ? (
                                <div className="flex flex-col items-center justify-center p-2 text-center w-full h-full">
                                    <div className="absolute inset-2 border-2 border-white/30 border-dashed rounded-sm"></div>
                                    <i className="ri-magic-line text-white text-3xl drop-shadow-md z-10"></i>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{ animation: 'collageShimmer 3s ease-in-out 0.4s infinite' }} />
                                </div>
                            ) : size.id === 'spotify_scan_10x15' ? (
                                <div className="w-full h-full bg-black flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                    <div className="w-[80%] h-[60%] border border-white/20 rounded-sm relative overflow-hidden mb-1 bg-gradient-to-br from-gray-800 to-black">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                                            <i className="ri-spotify-fill text-white text-4xl"></i>
                                        </div>
                                    </div>
                                    <div className="w-[70%] h-1 bg-white/20 rounded-full mb-1"></div>
                                    <div className="w-[50%] h-1 bg-white/10 rounded-full mb-2"></div>
                                    <div className="w-full h-4 px-1">
                                        <div className="w-full h-full bg-green-500/80 rounded-sm flex items-center justify-center">
                                            <div className="w-1/2 h-[2px] bg-black/40 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: 'collageShimmer 3s ease-in-out infinite' }} />
                                </div>
                            ) : size.id === 'secret_qr_10x15' ? (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden p-2">
                                    <div className="w-[85%] h-[80%] border-2 border-white/20 rounded-md relative flex flex-col box-border bg-black/20 backdrop-blur-sm shadow-inner group-hover:block transition-all duration-300">
                                        <div className="flex-1 flex items-center justify-center">
                                            <i className="ri-image-2-line text-white/40 text-4xl"></i>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded shadow-lg transform rotate-[-5deg] border border-gray-200">
                                            <i className="ri-qr-code-line text-black text-2xl leading-none block"></i>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/20 to-transparent" style={{ animation: 'collageShimmer 4s ease-in-out infinite' }} />
                                </div>
                            ) : size.id === 'photo_split' || size.id.includes('split') ? (
                                <div className="relative w-full h-full">
                                    <div className="w-full h-full flex items-center gap-1.5 p-1 overflow-hidden">
                                        {['#D75F1E', '#3B82F6', '#10B981', '#F59E0B', '#6366f1'].map((color, i) => {
                                            const heights = ['40%', '60%', '88%', '60%', '40%'];
                                            return (
                                                <div key={i}
                                                    className="flex-1 rounded-[2px] flex flex-col items-center justify-center p-0.5 shadow-md border-[5px] border-black/10 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                                                    style={{ backgroundColor: color, height: heights[i] }}
                                                >
                                                    <div className="w-full h-full bg-white/30 rounded-[1px] flex items-center justify-center relative z-10"></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" style={{ animation: 'collageShimmer 3s ease-in-out 0.8s infinite' }} />
                                </div>
                            ) : size.isAlbum ? (
                                <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent relative flex items-center justify-center">
                                    <i className="ri-book-open-line text-white text-4xl drop-shadow-md z-10"></i>
                                    <div className="absolute inset-x-2 bottom-2 h-1 bg-white/30 rounded-full"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" style={{ animation: 'collageShimmer 3s ease-in-out 0.6s infinite' }} />
                                </div>
                            ) : (
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 ease-in-out"
                                    style={{
                                        animation: 'slideShine 3s infinite ease-in-out'
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const albumSizes = sizes.filter(s => s.isAlbum);
    const uniqueSizes = sizes.filter(s => s.category === 'unique' || s.id === 'spotify_scan_10x15' || s.id === 'secret_qr_10x15' || s.id === 'photo_split' || s.id.includes('split'));
    const singleSizes = sizes.filter(s => !s.isCollage && !s.isOverlay && !s.isAlbum && !s.isCalendar && !s.isPhotoStrip && s.category !== 'unique' && !uniqueSizes.some(u => u.id === s.id));
    const collageSizes = sizes.filter(s => s.isCollage && !s.isPhotoStrip && !s.isAlbum);
    const overlaySizes = sizes
        .filter(s => (s.isOverlay || s.isPhotoStrip || s.isCalendar) && !s.isAlbum && !uniqueSizes.some(u => u.id === s.id))
        .sort((a, b) => {
            if (a.isCalendar && !b.isCalendar) return 1;
            if (!a.isCalendar && b.isCalendar) return -1;
            return parseFloat(a.price) - parseFloat(b.price);
        });

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const width = scrollRef.current.clientWidth;
            const index = Math.round(scrollLeft / width);
            const newMode = modesOrder[index] as any;
            if (newMode && newMode !== mode) {
                setSlideDirection(index > modesOrder.indexOf(mode) ? 'left' : 'right');
                setAnimKey(prev => prev + 1);
                setMode(newMode);
            }
        }
    };

    const scrollToMode = (targetMode: any) => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.clientWidth;
        const targetIdx = modesOrder.indexOf(targetMode);
        scrollRef.current.scrollTo({ left: width * targetIdx, behavior: 'smooth' });
        if (targetMode !== mode) {
            setSlideDirection(targetIdx > modesOrder.indexOf(mode) ? 'left' : 'right');
            setAnimKey(prev => prev + 1);
        }
        setMode(targetMode);
    };

    return (
        <div className="h-full w-full flex flex-col relative overflow-hidden">
            <div className="flex flex-col items-center justify-between gap-3 px-4 pt-4 shrink-0">
                <button onClick={onBack} className="self-start flex items-center gap-1 text-[#2D3A52] active:text-orange-600 transition-colors bg-white/50 backdrop-blur rounded-full px-3 py-1 shadow-sm">
                    <i className="ri-arrow-left-line text-lg"></i>
                    <span className="text-sm font-bold">Volver</span>
                </button>

                <div className="flex-1 flex flex-col items-center w-full">
                    <div className="flex items-center justify-between w-full h-[60px]">
                        <button className={`p-1 rounded-full active:bg-gray-100 ${mode !== 'single' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            onClick={() => scrollToMode(modesOrder[Math.max(0, modesOrder.indexOf(mode) - 1)])}>
                            <i className="ri-arrow-left-s-line text-3xl" style={{ color: 'var(--brand-600)' }}></i>
                        </button>

                        <div className="text-center px-1 flex-1 max-w-[200px] overflow-hidden relative h-full">
                            <div key={animKey} className={`flex flex-col items-center justify-center w-full absolute inset-0 transition-transform ${slideDirection === 'left' ? 'animate-slideInRight' : slideDirection === 'right' ? 'animate-slideInLeft' : ''}`}>
                                <h1 className="text-base font-bold text-[#2D3A52] leading-tight">
                                    {mode === 'single' ? 'Clásicos' : mode === 'collage' ? 'Collage' : mode === 'overlay' ? 'Especiales' : mode === 'album' ? 'Álbumes' : 'Únicos'}
                                </h1>
                            </div>
                        </div>

                        <button className={`p-1 rounded-full active:bg-gray-100 ${mode !== 'unique' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            onClick={() => scrollToMode(modesOrder[Math.min(modesOrder.length - 1, modesOrder.indexOf(mode) + 1)])}>
                            <i className="ri-arrow-right-s-line text-3xl" style={{ color: 'var(--brand-600)' }}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Snap Scroll View Container */}
            <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory w-full no-scrollbar flex-1 pb-4 scroll-smooth touch-pan-x inline-flex" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', display: 'flex' }}>
                {[
                    { id: 'single', arr: singleSizes }, { id: 'collage', arr: collageSizes },
                    { id: 'overlay', arr: overlaySizes }, { id: 'album', arr: albumSizes },
                    { id: 'unique', arr: uniqueSizes }
                ].map((view) => (
                    <div key={view.id} className="w-full h-full flex-shrink-0 snap-center px-4 pt-2 overflow-y-auto no-scrollbar pb-6 relative" style={{ minWidth: '100%' }}>
                        <div className="grid grid-cols-1 gap-4 w-full pb-4">
                            {view.arr.length === 0 && <p className="text-center text-gray-500 text-sm col-span-2 py-10 opacity-70">Próximamente...</p>}
                            {view.arr.map(size => (
                                <div key={size.id} className="bg-white/90 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center shadow border-b-[3px] border-transparent active:border-orange-500 active:scale-95 transition-all">
                                    <div className="mb-2 w-full h-[130px] flex items-center justify-center pointer-events-none">
                                        <SizePreview size={size} />
                                    </div>
                                    <div className="text-center w-full mt-auto">
                                        <h3 className="text-xs font-bold text-[#2D3A52] line-clamp-1">{size.name}</h3>
                                        <p className="text-[10px] text-[#2D3A52]/70 mb-1">{size.dimensions}</p>
                                        <div className="rounded-lg px-2 py-0.5">
                                            <span className="font-extrabold text-sm" style={{ color: 'var(--brand-600)' }}>${size.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-1.5 pb-6 shrink-0 z-10 w-full pt-2">
                {modesOrder.map(m => (
                    <button key={m} className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                            backgroundColor: mode === m ? 'var(--brand-500)' : '#D1D5DB',
                            width: mode === m ? '1rem' : '0.375rem'
                        }}
                        onClick={() => scrollToMode(m)}
                    />
                ))}
            </div>
        </div>
    );
};

// ==========================================
// ROOT COMPONENT (App Mobile)
// ==========================================
export default function MobileSimulationFlow() {
    const [currentScreen, setCurrentScreen] = useState<'category' | 'sizes'>('category');
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <div className="flex items-center justify-center font-sans selection:bg-orange-500/30 overflow-hidden relative">
            <style dangerouslySetInnerHTML={{
                __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideInRight { 0% { transform: translateX(30px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft { 0% { transform: translateX(-30px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        .animate-slideInRight { animation: slideInRight 0.3s cubic-bezier(0.2,0.8,0.2,1) forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.3s cubic-bezier(0.2,0.8,0.2,1) forwards; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}} />

            {/* Container de hardware simulado: hand-held mockup */}
            <div className="relative w-[600px] h-[1078px] shrink-0 z-30 origin-top select-none pointer-events-none">
                {/* El contenido de la pantalla: Posicionado detrás de la mano */}
                <div
                    className="absolute z-10 bg-white overflow-hidden pointer-events-auto flex flex-col pt-2"
                    style={{
                        top: '17.6%',
                        left: '25.9%',
                        width: '42.2%',
                        height: '52.8%',
                        borderRadius: '1.5rem 1.5rem 1.5rem 1.5rem'
                    }}
                >
                    <div className="absolute top-0 left-0 w-full h-[140px] z-0 overflow-hidden rounded-t-[1rem]">
                        <BrandWaves height="100%" className="w-full h-full pointer-events-none" />
                    </div>

                    {/* Navegación Base */}
                    <div className="w-full flex-1 z-10 relative mt-4 rounded-b-[1.2rem] overflow-hidden">
                        {currentScreen === 'category' ? (
                            <CategoryScreenMock onCategorySelect={(cat) => { setSelectedCategory(cat); setCurrentScreen('sizes'); }} />
                        ) : (
                            <SizeSelectionMock category={selectedCategory} onBack={() => setCurrentScreen('category')} />
                        )}
                    </div>
                </div>

                {/* La mano sosteniendo el teléfono: Por encima del contenido */}
                <img
                    src="/hand.png"
                    alt="Hand holding phone"
                    style={{ transform: 'scale(1.3)' }}
                    className="absolute inset-0 w-full h-full object-contain z-20 select-none pointer-events-none"
                />
            </div>
        </div>
    );
}
