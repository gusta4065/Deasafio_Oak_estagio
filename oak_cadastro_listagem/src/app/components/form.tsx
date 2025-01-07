'use client';
import { Button, Sheet, Card, CardContent, CardActions, Input, Radio } from '@mui/joy';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormData {
  id: string,
  name: string;
  description: string;
  prize: number;
  avaliabe: string;
}
interface CardFormProps {
  onClose: () => void; 
}
export default function CardForm({ onClose }: CardFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: '',
    prize: 0,
    avaliabe: 'true',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedProducts = localStorage.getItem('products');
    const products: FormData[] = storedProducts ? JSON.parse(storedProducts) : [];
    formData.id = self.crypto.randomUUID()
    products.push(formData);
    products.sort((a,b)=> a.prize-b.prize)
    localStorage.setItem('products', JSON.stringify(products));

    router.push('/views/list')
    onClose();
  };

  return (
    <div>
      <Sheet color="neutral" variant="soft">
        <Card size="lg">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <p>Nome do Produto</p>
              <Input
                color="primary"
                value={formData.name}
                onChange={handleChange}
                name="name"
                size="lg"
                variant="outlined"
              />
              <p>Descrição do Produto</p>
              <Input
                color="primary"
                value={formData.description}
                onChange={handleChange}
                name="description"
                size="lg"
                variant="outlined"
              />
              <p>Valor do produto</p>
              <Input
                color="primary"
                value={formData.prize}
                onChange={handleChange}
                name="prize"
                size="lg"
                variant="outlined"
              />
              <p>Produto disponível para venda</p>
              <Radio
                checked={formData.avaliabe === 'true'}
                onChange={handleChange}
                value="true"
                label="Sim"
                name="avaliabe"
                slotProps={{ input: { 'aria-label': 'Sim' } }}
              />
              <Radio
                checked={formData.avaliabe === 'false'}
                onChange={handleChange}
                value="false"
                label="Não"
                name="avaliabe"
                slotProps={{ input: { 'aria-label': 'Não' } }}
              />
              <CardActions>
                <Button type="submit" >Adicionar</Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Sheet>
    </div>
  );
}
