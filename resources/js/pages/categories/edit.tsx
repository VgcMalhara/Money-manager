import { Head, useForm, Link } from '@inertiajs/react';
import {
    ChevronLeft, Check, Tag, ShoppingCart, Utensils,
    Car, Home, Briefcase, Zap, Gift, Coffee,
    Smartphone, Plane, Dumbbell, Music, Wallet, Star
} from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const ICON_OPTIONS = [
    { name: 'tag', icon: Tag },
    { name: 'shopping-cart', icon: ShoppingCart },
    { name: 'utensils', icon: Utensils },
    { name: 'car', icon: Car },
    { name: 'wallet', icon: Wallet },
    { name: 'home', icon: Home },
    { name: 'briefcase', icon: Briefcase },
    { name: 'zap', icon: Zap },
    { name: 'gift', icon: Gift },
    { name: 'coffee', icon: Coffee },
    { name: 'star', icon: Star },
    { name: 'smartphone', icon: Smartphone },
    { name: 'plane', icon: Plane },
    { name: 'dumbbell', icon: Dumbbell },
    { name: 'music', icon: Music },
];

const COLOR_OPTIONS = [
    { name: 'Red', hex: '#FF4D4D' },
    { name: 'Orange', hex: '#FF9F43' },
    { name: 'Green', hex: '#2ECC71' },
    { name: 'Blue', hex: '#3498DB' },
    { name: 'Indigo', hex: '#6610F2' },
    { name: 'Pink', hex: '#E84393' },
    { name: 'Purple', hex: '#9B59B6' },
    { name: 'Teal', hex: '#1ABC9C' },
];

export default function Edit({ category }: { category: any }) {
    // Database eke thiyena data tika useForm ekata pass karamu
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // PUT request ekak yවන්නේ update karanna
        put(route('categories.update', category.id));
    };

    return (
        <>
            <Head title={`Edit: ${category.name}`} />
            <div className="max-w-md mx-auto min-h-screen bg-background sm:bg-muted/10 p-4 sm:p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href={route('categories.index')} className="text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft size={28} />
                    </Link>
                    <h1 className="text-lg font-extrabold uppercase tracking-tighter italic">Edit Category</h1>
                    <div className="w-7"></div>
                </div>

                <form onSubmit={submit} className="space-y-6">

                    {/* Visual Card Section */}
                    <div className="bg-card rounded-[2.5rem] p-8 shadow-sm border border-border/40 space-y-8">

                        {/* Center Preview */}
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 scale-110"
                                style={{ backgroundColor: data.color }}
                            >
                                {(() => {
                                    const SelectedIcon = ICON_OPTIONS.find(i => i.name === data.icon)?.icon || Tag;

                                    return <SelectedIcon size={32} strokeWidth={2.5} />;
                                })()}
                            </div>

                            <div className="w-full text-center">
                                <Input
                                    className="bg-transparent border-none text-center text-2xl font-bold placeholder:text-muted-foreground/20 focus-visible:ring-0 h-auto p-0 mb-1"
                                    placeholder="Enter Name..."
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-destructive text-xs font-semibold">{errors.name}</p>}
                            </div>
                        </div>

                        <hr className="opacity-10" />

                        {/* Income/Expense Toggle */}
                        <div className="flex gap-2">
                            {['expense', 'income'].map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setData('type', t)}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-2xl text-sm font-bold capitalize transition-all",
                                        data.type === t
                                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                            : "bg-muted/50 text-muted-foreground opacity-50 hover:opacity-100"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Picker */}
                    <div className="bg-card rounded-[2rem] p-6 shadow-sm border border-border/40 space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Update Color</Label>
                        <div className="flex flex-wrap gap-4 justify-between px-1">
                            {COLOR_OPTIONS.map((c) => (
                                <button
                                    key={c.hex}
                                    type="button"
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-75",
                                        data.color === c.hex ? "ring-2 ring-offset-4 ring-offset-background" : ""
                                    )}
                                    style={{ backgroundColor: c.hex, ringColor: c.hex } as any}
                                    onClick={() => setData('color', c.hex)}
                                >
                                    {data.color === c.hex && <Check size={14} className="text-white stroke-[4px]" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Icon Grid */}
                    <div className="bg-card rounded-[2rem] p-6 shadow-sm border border-border/40 space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Change Icon</Label>
                        <div className="grid grid-cols-5 gap-3">
                            {ICON_OPTIONS.map((opt) => {
                                const IconComponent = opt.icon;

                                return (
                                    <button
                                        key={opt.name}
                                        type="button"
                                        className={cn(
                                            "aspect-square rounded-2xl border flex items-center justify-center transition-all active:scale-90",
                                            data.icon === opt.name
                                                ? "bg-foreground text-background border-foreground shadow-md"
                                                : "bg-muted/20 border-transparent text-muted-foreground"
                                        )}
                                        onClick={() => setData('icon', opt.name)}
                                    >
                                        <IconComponent size={20} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="pt-2">
                        <Button
                            className="w-full h-16 rounded-[2rem] text-lg font-black shadow-xl transition-all active:scale-95 border-none text-white"
                            disabled={processing}
                            style={{ backgroundColor: data.color }}
                        >
                            {processing ? 'Updating...' : 'UPDATE CATEGORY'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Categories', href: '/categories' },
        { title: 'Edit', href: '#' }
    ],
};
