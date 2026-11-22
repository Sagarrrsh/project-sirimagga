import React, { useState } from 'react';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { formatINR } from '../../data/demoData';
import { OperationType, db, handleFirestoreError } from '../../lib/firebase';
import type { Manufacturer } from '../../types';

interface AdminManufacturersTabProps {
  manufacturers: Manufacturer[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export function AdminManufacturersTab({
  manufacturers,
  onShowToast,
}: AdminManufacturersTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Ilkal, Bagalkot District');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [codesText, setCodesText] = useState('');
  const [pricesText, setPricesText] = useState('');
  const [notes, setNotes] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setLocation('Ilkal, Bagalkot District');
    setContactPerson('');
    setPhone('');
    setCodesText('');
    setPricesText('');
    setNotes('');
    setIsActive(true);
  };

  const loadForEdit = (m: Manufacturer) => {
    setEditingId(m.id);
    setName(m.name);
    setLocation(m.location);
    setContactPerson(m.contactPerson || '');
    setPhone(m.phone);
    setCodesText(m.assignedProductCodes.join(', '));
    setPricesText(
      Object.entries(m.purchasePricesByCode || {})
        .map(([k, v]) => `${k}:${v}`)
        .join(', ')
    );
    setNotes(m.availabilityNotes || '');
    setIsActive(m.isActive);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const id = editingId || `mfg_${Date.now()}`;
    const assignedProductCodes = codesText
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);

    const purchasePricesByCode: Record<string, number> = {};
    pricesText
      .split(',')
      .map((pair) => pair.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const [code, priceStr] = pair.split(':').map((x) => x.trim());
        const num = Number(priceStr);
        if (code && Number.isFinite(num) && num >= 0) {
          purchasePricesByCode[code.toUpperCase()] = num;
        }
      });

    const existing = manufacturers.find((m) => m.id === editingId);
    const path = `manufacturers/${id}`;
    try {
      await setDoc(doc(db, 'manufacturers', id), {
        name: name.trim().slice(0, 140),
        location: location.trim().slice(0, 140),
        contactPerson: contactPerson.trim().slice(0, 120),
        phone: phone.trim().slice(0, 24),
        assignedProductCodes,
        purchasePricesByCode,
        availabilityNotes: notes.trim().slice(0, 800),
        isActive,
        createdAt: existing?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      onShowToast(editingId ? 'Manufacturer updated.' : 'Manufacturer added.');
      resetForm();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const path = `manufacturers/${id}`;
    try {
      await deleteDoc(doc(db, 'manufacturers', id));
      onShowToast('Manufacturer removed.', 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Add / Edit Manufacturer Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-5 bg-white border border-[#B18A4A]/30 rounded-lg p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif-display text-lg font-semibold text-[#332821]">
            {editingId ? 'Edit Manufacturer' : 'Add Partner Manufacturer'}
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

        <p className="text-xs text-[#6A5A4E]">
          Strictly private to administrators. Never displayed on storefront or customer order tracking.
        </p>

        <div>
          <label className="block text-xs font-medium mb-1">Manufacturer / Unit Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Shree Sangameshwar Textiles"
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Location *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Rabkavi / Banahatti / Ilkal"
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Contact Person</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Contact Phone / WhatsApp *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98450 XXXXX"
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">
            Assigned Product Codes (comma-separated)
          </label>
          <input
            type="text"
            value={codesText}
            onChange={(e) => setCodesText(e.target.value)}
            placeholder="SRM-ILK-101, SRM-FST-501"
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code uppercase"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">
            Purchase Prices by Code (CODE:PRICE, comma-separated)
          </label>
          <input
            type="text"
            value={pricesText}
            onChange={(e) => setPricesText(e.target.value)}
            placeholder="SRM-ILK-101:1780, SRM-FST-501:2050"
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm font-mono-code"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">
            Availability & Procurement Notes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#B18A4A]/35 rounded text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="accent-[#651D2D]"
          />
          <span>Active Supplier</span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 bg-[#651D2D] text-[#F5EFE4] text-sm font-semibold rounded hover:bg-[#4F1522] inline-flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{saving ? 'Saving...' : editingId ? 'Update Manufacturer' : 'Save Manufacturer'}</span>
        </button>
      </form>

      {/* Manufacturers List */}
      <div className="lg:col-span-7 space-y-4">
        {manufacturers.length === 0 ? (
          <div className="bg-white border border-[#B18A4A]/30 rounded-lg p-10 text-center text-sm text-[#6A5A4E]">
            No manufacturers saved in Firestore yet. Add one on the left or seed the demo dataset from the Overview tab.
          </div>
        ) : (
          manufacturers.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-[#B18A4A]/30 rounded-lg p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6A5A4E]">
                    <span>{m.location}</span>
                    <span>·</span>
                    <span className={m.isActive ? 'text-emerald-700 font-medium' : 'text-red-700'}>
                      {m.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-[#332821]">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#6A5A4E] mt-0.5">
                    {m.contactPerson ? `${m.contactPerson} · ` : ''}
                    <span className="font-mono-code text-[#332821]">{m.phone}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => loadForEdit(m)}
                    aria-label={`Edit ${m.name}`}
                    className="p-2 text-[#332821] hover:text-[#651D2D]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    aria-label={`Delete ${m.name}`}
                    className="p-2 text-[#6A5A4E] hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {m.assignedProductCodes.length > 0 && (
                <div className="pt-2 border-t border-[#B18A4A]/15 text-xs space-y-1">
                  <p className="font-medium text-[#332821]">Assigned Codes & Purchase Costs:</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#6A5A4E]">
                    {m.assignedProductCodes.map((code) => (
                      <span key={code} className="font-mono-code">
                        {code}:{' '}
                        <strong className="text-[#332821]">
                          {typeof m.purchasePricesByCode?.[code] === 'number'
                            ? formatINR(m.purchasePricesByCode[code])
                            : 'Cost not set'}
                        </strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {m.availabilityNotes && (
                <p className="text-xs text-[#6A5A4E] italic">{m.availabilityNotes}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
