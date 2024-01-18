import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    IconButton,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { MdEdit } from "react-icons/md";
  import { MdDeleteOutline } from "react-icons/md";
  function InvoiceForm() {
    const [invoiceData, setInvoiceData] = useState({
      logo: "",
      name: "",
      address: "",
      date: "",
      invoiceId: "",
    });
    const [items, setItems] = useState([
      { id: 1, description: "", price: 0, quantity: 0 },
    ]);
  
    const handleItemChange = (id, field, value) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );
      setItems(updatedItems);
    };
  
    const handleDeleteItem = (id) => {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
    };
  
    const handleAddItem = () => {
      const newItem = {
        id: items.length + 1,
        description: "",
        price: 0,
        quantity: 0,
      };
      setItems([...items, newItem]);
    };
    const calculateSubtotal = () => {
      return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };
    const tableHead = [
      "#Id",
      "Item Description",
      "Price",
      "Quantity",
      "Total",
      "Action",
    ];
  
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Box
            className="example"
            sx={{
              width: "60%",
              border: "1px solid gray",
              borderRadius: "10px",
              background: "smokewhite",
              boxShadow: "1px 3px 2px 2px gray",
              padding: "20px",
              height: "95vh",
              overflowY: "scroll",
            }}
          >
            <Heading as="h3" size="lg" mb={2} sx={{ background: "#4287f5", color: "#fff",textAlign:'center' }}>
              Invoice
            </Heading>
            <Divider mt={4}/>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem w="100%">
                <FormLabel>Logo:</FormLabel>
                <input
                  type="file"
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, logo: e.target.files })
                  }
                  accept=".jpg, .jpeg, .png, .gif, .pdf,doc,docx"
                />
              </GridItem>
              <GridItem w="100%" />
              <GridItem w="100%">
                <FormControl>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Your name"
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, name: e.target.value })
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <FormLabel>Address:</FormLabel>
                <Textarea
                  value={invoiceData.address}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, address: e.target.value })
                  }
                  placeholder="Address"
                />
              </GridItem>
              <GridItem w="100%">
                <FormLabel>Date:</FormLabel>
                <Input
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, date: e.target.value })
                  }
                />
              </GridItem>
              <GridItem w="100%">
                <FormLabel>Invoide#:</FormLabel>
                <Input
                  type="text"
                  value={invoiceData.invoiceId}
                  onChange={(e) =>
                    setInvoiceData({ ...invoiceData, invoiceId: e.target.value })
                  }
                />
              </GridItem>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                size="sm"
                variant="solid"
                colorScheme="red"
                onClick={handleAddItem}
                mt={4}
              >
                Add Item
              </Button>
            </Box>
            <TableContainer>
              <Table size='sm' variant='striped' colorScheme='teal' mt={4}>
                <Thead sx={{ background: "#4287f5" }}>
                  <Tr>
                    {tableHead.map((item) => (
                      <Th sx={{ color: "#fff" }}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item.id}>
                      <Td>#{item.id}</Td>
                      <Td>
                        <Input
                          type="text"
                          placeholder="description"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(item.id, "price", e.target.value)
                          }
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(item.id, "quantity", e.target.value)
                          }
                        />
                      </Td>
                      <Td>{item.price * item.quantity}</Td>
                      <Td sx={{ display: "flex" }}>
                        <IconButton
                          variant="solid"
                          colorScheme="red"
                          aria-label="Delete"
                          fontSize="20"
                          icon={<MdDeleteOutline />}
                          onClick={() => handleDeleteItem(item.id)}
                          mx={2}
                        />
                        <IconButton
                          variant="solid"
                          colorScheme="teal"
                          aria-label="Edit"
                          fontSize="20px"
                          icon={<MdEdit />}
                          onClick={() => handleItemChange(item.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              </TableContainer>
              <Divider mt={4}/>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={2}>
              <GridItem w="100%" sx={{ textAlign: "justify" }}>
                <Heading as="h4" size="md">
                  About
                </Heading>
                <p sx={{fontsize:'12px'}}>
                An invioive, bill or tab is a commericial document issued by a seller to a buyer relating to sale transaction and indicationg
                the products, quantities, and agreed-upon prices for products or services the seller had provided the buyer.
                </p>
              </GridItem>
              <GridItem w="100%" my={4} sx={{textAlign:'center'}}>
                <Text fontWeight="bold">
                  Subtotal:{" "}
                  <span style={{ color: "gray" }}>{calculateSubtotal()} Rs</span>
                </Text>
                <Text fontWeight="bold">
                  Tax: <span style={{ color: "gray" }}>0.00%</span>
                </Text>
                <Text
                  bg="blue.500"
                  sx={{ borderRadius: "30px", fontWeight: "bold" }}
                >
                  Total:{" "}
                  <span style={{ color: "#fff" }}>{calculateSubtotal()} Rs</span>
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
  export default InvoiceForm;
  