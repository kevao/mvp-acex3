"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api, User } from "@/services/api";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const formatPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatZip = (value: string) => {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const formatCpf = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [stateUf, setStateUf] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const me = await api.getProfile();
        setUser(me);
        setName(me.name || "");
        setPhone(formatPhone(me.phone || ""));
        setCpf(formatCpf(me.cpf || ""));
        if (me.address) {
          setStreet(me.address.street || "");
          setNumber(me.address.number || "");
          setComplement(me.address.complement || "");
          setDistrict(me.address.district || "");
          setCity(me.address.city || "");
          setStateUf(me.address.state || "");
          setZipCode(formatZip(me.address.zipCode || ""));
        }
      } catch (e: any) {
        toast.error(e?.message || "Falha ao carregar perfil");
      }
      setLoading(false);
    };
    load();
  }, []);

  const onSave = async () => {
    if (!name || !user) return;
    setSaving(true);
    try {
      const phoneRaw = onlyDigits(phone);
      const cpfRaw = onlyDigits(cpf);
      const zipRaw = onlyDigits(zipCode);
      const addressPayload = street || number || district || city || stateUf || zipCode || complement
        ? {
          street,
          number,
          complement: complement || undefined,
          district,
          city,
          state: stateUf,
          zipCode: zipRaw,
        }
        : undefined;
      const updated = await api.updateMyProfile({ name, phone: phoneRaw || undefined, cpf: cpfRaw || undefined, address: addressPayload });
      setUser(updated);
      toast.success("Perfil atualizado");
    } catch (e: any) {
      toast.error(e?.message || "Falha ao atualizar perfil");
    }
    setSaving(false);
  };

  const onChangePassword = async () => {
    if (!user) return;
    if (!currentPassword || !newPassword || newPassword !== confirmNewPassword) {
      toast.error("Verifique as senhas informadas.");
      return;
    }
    setSavingPwd(true);
    try {
      const updated = await api.changeMyPassword({ currentPassword, newPassword });
      setUser(updated);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      toast.success("Senha alterada com sucesso");
    } catch (e: any) {
      const msg = e?.message || "Falha ao alterar senha";
      toast.error(msg);
    }
    setSavingPwd(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">Atualize seu nome de exibição.</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Carregando...
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6 h-full">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ""} disabled className="bg-muted text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(00) 00000-0000" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={onSave} disabled={saving || !name}>Salvar</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 h-full">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Alterar Senha</h3>
                <div className="space-y-2">
                  <Label htmlFor="current">Senha atual</Label>
                  <div className="relative">
                    <Input
                      id="current"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pr-10"
                      autoComplete="current-password"
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowCurrent(s => !s)}>
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">Nova senha</Label>
                  <div className="relative">
                    <Input
                      id="new"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pr-10"
                      autoComplete="new-password"
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowNew(s => !s)}>
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmar nova senha</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="pr-10"
                      autoComplete="new-password"
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowConfirm(s => !s)}>
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Button onClick={onChangePassword} disabled={savingPwd || !currentPassword || !newPassword || newPassword !== confirmNewPassword}>Salvar nova senha</Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold">Endereço</h3>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">CEP</Label>
                  <Input id="zip" value={zipCode} onChange={(e) => setZipCode(formatZip(e.target.value))} placeholder="00000-000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" value={complement} onChange={(e) => setComplement(e.target.value)} placeholder="Apartamento, bloco, etc." />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="district">Bairro</Label>
                  <Input id="district" value={district} onChange={(e) => setDistrict(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">UF</Label>
                  <Select value={stateUf} onValueChange={(v) => setStateUf(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={onSave} disabled={saving || !name}>Salvar endereço</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AccountPage;