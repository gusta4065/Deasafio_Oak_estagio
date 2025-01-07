'use client';
import React, { useEffect, useState } from 'react';
import {Button, Modal, ModalDialog, Sheet, Table, Typography} from '@mui/joy';
import CardForm from '@/app/components/form';



interface FormData {
    id: string,
    name: string;
    description: string;
    prize: number;
    avaliabe: string;
}

export default function ListPage() {
  const [products, setProducts] = useState<FormData[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

return (
    <div>
        <Sheet color="neutral" variant="soft" 
            sx={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
                }}>
            <Typography 
                sx={{ textAlign: 'center', marginBottom: '20px'  }}
                color="neutral"
                level="h3"
                noWrap={false}
                variant="plain"
                >
                Lista de Produtos
            </Typography>
            <Sheet 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
            >
                <Table
                borderAxis="xBetween"
                size="sm"
                variant="plain"
                sx={{
                    width: '70%',
                    maxWidth: '800px',
                    margin: '0 auto', 
                  }}
                >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                        </tr>
                    </thead>  
                    <tbody>
                        {products.map((product)=> (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.prize}</td>
                            </tr>
                        ) )}
                    </tbody>
                </Table>
            </Sheet>
            <Button type="submit" onClick={() => setOpen(true)} >Adicionar</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <CardForm onClose={() => {
                        setOpen(false);
                    }
                        }/>
                </ModalDialog>
            </Modal>
        </Sheet>

    </div>
);

}
