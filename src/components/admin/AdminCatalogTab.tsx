import React, { useState } from 'react';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import {
  IMG_BANAHATTI_COTTON,
  IMG_ILKAL_MAROON,
  IMG_INDIGO_DAILY,
  IMG_SILK_FESTIVE,
  formatINR,
} from '../../data/demoData';
import { OperationType, db, handleFirestoreError } from '../../lib/firebase';
import type { AvailabilityStatus, Category, Product } from '../../types';

interface AdminCatalogTabProps {
  products: Product[];
  categories: Category[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const PRESET_IMAGES = [
  { label: 'Ilkal Maroon', url: IMG_ILKAL_MAROON },
  { label: 'Banahatti Ivory Cotton', url: IMG_BANAHATTI_COTTON },
  { label: 'Festive Silk Maroon', url: IMG_SILK_FESTIVE },
  { label: 'Indigo Daily Cotton', url: IMG_INDIGO_DAILY },
];

export function AdminCatalogTab({
  products,
  categories,
  onShowToast,
}: AdminCatalogTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [productCode, setProductCode] = useState('');
  const [category, setCategory] = useState('Ilkal Sarees');
  const [sareeType, setSareeType] = useState('Ilkal');
  const [description, setDescription] = useState('');
  const [fabricInfo, setFabricInfo] = useState('');
  const [sareeLength, setSareeLength] = useState('5.5 meters saree + 0.8 meters blouse piece');
  const [blousePieceInfo, setBlousePieceInfo] = useState('Matching unstitched blouse piece included');
  const [careInstructions, setCareInstructions] = useState('Dry clean recommended for first wash.');
  const [sellingPrice, setSellingPrice] = useState(2490);
  const [originalPrice, setOriginalPrice] = useState(2990);
  const [colorsText, setColorsText] = useState('Deep Maroon, Antique Gold');
  const [imageUrl, setImageUrl] = useState(IMG_ILKAL_MAROON);
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>('Available');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setProductCode('');
    setDescription('');
    setFabricInfo('');
    setSellingPrice(2490);
    setOriginalPrice(2990);
    setIsDemo(false);
  };

  const loadProduct = (p: Product) => {
    setEditingId(p.id);
    setTitle(p.title);
    setProductCode(p.productCode);
    setCategory(p.category);
    setSareeType(p.sareeType);
    setDescription(p.description);
    setFabricInfo(p.fabricInfo);
    setSareeLength(p.sareeLength);
    setBlousePieceInfo(p.blousePieceInfo || '');
    setCareInstructions(p.careInstructions);
    setSellingPrice(p.sellingPrice);
    setOriginalPrice(p.originalPrice || p.sellingPrice);
    setColorsText(p.colorOptions.join(', '));
    setImageUrl(p.images[0] || IMG_ILKAL_MAROON);
    setAvailabilityStatus(p.availabilityStatus);
    setIsBestseller(p.isBestseller);
    setIsNewArrival(p.isNewArrival);
    setIsDemo(p.isDemo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const id = editingId || `siri_${Date.now()}`;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 140);
    const cleanCode = productCode.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
    const discountPercent =
      originalPrice > sellingPrice
        ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
        : 0;

    const existing = products.find((p) => p.id === editingId);
    const path = `products/${id}`;
    try {
      await setDoc(doc(db, 'products', id), {
        title: title.trim().slice(0, 140),
        slug: slug || `saree-${Date.now()}`,
        productCode: cleanCode || `SRM-${Date.now().toString().slice(-4)}`,
        description: description.trim().slice(0, 2500),
        category,
        sareeType,
        fabricInfo: fabricInfo.trim().slice(0, 300),
        sareeLength: sareeLength.trim().slice(0, 120),
        blousePieceInfo: blousePieceInfo.trim().slice(0, 200),
        careInstructions: careInstructions.trim().slice(0, 400),
        sellingPrice: Number(sellingPrice),
        originalPrice: Number(originalPrice),
        discountPercent,
        colorOptions: colorsText
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
        images: [imageUrl.trim() || IMG_ILKAL_MAROON],
        availabilityStatus,
        estimatedDispatchDays: 'Dispatches in 3–5 business days after quality inspection',
        isBestseller,
        isNewArrival,
        popularityScore: existing?.popularityScore ?? 85,
        isDemo,
        createdAt: existing?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      onShowToast(editingId ? 'Product updated.' : 'Product published to storefront.');
      resetForm();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const path = `products/${id}`;
    try {
      await deleteDoc(doc(db, 'products', id));
      onShowToast('Product deleted.', 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-5 bg-white border border-[#B18A4A]/30 rounded-lg p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
            {editingId ? 'Edit Saree Product' : 'Add New Saree'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-[#651D2D] hover:underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ilkal Tope Teni Maroon Saree"
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Code *</label>
            <input
              type="text"
              required
              value={productCode}
              onChange={(e) => setProductCode(e.target.value.toUpperCase())}
              placeholder="SRM-ILK-109"
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Saree Type</label>
            <input
              type="text"
              required
              value={sareeType}
              onChange={(e) => setSareeType(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Selling Price (₹)</label>
            <input
              type="number"
              min={1}
              required
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Original Price (₹)</label>
            <input
              type="number"
              min={0}
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Status</label>
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value as AvailabilityStatus)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            >
              <option value="Available">Available</option>
              <option value="Made to Order">Made to Order</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Description *</label>
          <textarea
            rows={2}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Fabric Information *</label>
          <input
            type="text"
            required
            value={fabricInfo}
            onChange={(e) => setFabricInfo(e.target.value)}
            placeholder="e.g., Cotton-Silk Blend Body"
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Saree Length *</label>
            <input
              type="text"
              required
              value={sareeLength}
              onChange={(e) => setSareeLength(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Colours (comma-separated)</label>
            <input
              type="text"
              required
              value={colorsText}
              onChange={(e) => setColorsText(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Product Image URL</label>
          <select
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm mb-2"
          >
            {PRESET_IMAGES.map((img) => (
              <option key={img.url} value={img.url}>
                Studio Photo: {img.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-1.5 bg-white border border-[#B18A4A]/35 rounded text-xs font-mono-code"
          />
        </div>

        <div className="flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isBestseller}
              onChange={(e) => setIsBestseller(e.target.checked)}
              className="accent-[#651D2D]"
            />
            Bestseller
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
              className="accent-[#651D2D]"
            />
            New Arrival
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isDemo}
              onChange={(e) => setIsDemo(e.target.checked)}
              className="accent-[#651D2D]"
            />
            Mark as Demo Data
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded hover:bg-[#4F1522] inline-flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{saving ? 'Saving...' : editingId ? 'Update Product' : 'Publish Saree'}</span>
        </button>
      </form>

      {/* Products Table */}
      <div className="lg:col-span-7 bg-white border border-[#B18A4A]/30 rounded-lg overflow-hidden">
        <div className="p-4 bg-[#FAF6EE] border-b border-[#B18A4A]/20">
          <h3 className="font-serif-display text-base font-semibold text-[#332821]">
            Catalogue Products ({products.length})
          </h3>
        </div>
        <div className="divide-y divide-[#B18A4A]/15 max-h-[680px] overflow-y-auto">
          {products.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-4">
              <img
                src={p.images[0]}
                alt={p.title}
                referrerPolicy="no-referrer"
                className="w-16 h-12 rounded object-cover bg-[#EFE7D6] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[#332821] truncate">{p.title}</p>
                <p className="text-xs text-[#6A5A4E]">
                  <span className="font-mono-code">{p.productCode}</span> · {p.category} ·{' '}
                  {p.availabilityStatus}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#332821] tabular-nums">
                  {formatINR(p.sellingPrice)}
                </p>
                {p.isDemo && <span className="text-[11px] text-[#6A5A4E]">Demo</span>}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => loadProduct(p)}
                  aria-label={`Edit ${p.title}`}
                  className="p-2 text-[#332821] hover:text-[#651D2D]"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  aria-label={`Delete ${p.title}`}
                  className="p-2 text-[#6A5A4E] hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
