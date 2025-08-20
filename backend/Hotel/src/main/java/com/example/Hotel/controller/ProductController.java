package com.example.Hotel.controller;

import com.example.Hotel.model.Product;
import com.example.Hotel.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/home")
public class ProductController {
    private  ProductService productService;

    //Constructor injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping
    public String greet()
    {
        return "hello world";
    }
    @GetMapping("/products")
    public List<Product> getAllProduct()
    {
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id)
    {
        return productService.getById(id);
    }

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart ("product") Product product , @RequestPart ("imageFile" )MultipartFile imageFile)

    {
        try
        {
        Product product1 =productService.addProduct(product,imageFile);
        return new ResponseEntity<>(product1,HttpStatus.CREATED);
    }
        catch (Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }

        @GetMapping("/product/{productId}/image")
        public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId)
    {
        Product product = productService.getById(productId);
        byte[] imageFile=product.getImageData();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(product.getImageType()))
                .body(imageFile);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id,@RequestPart Product product,@RequestPart MultipartFile imageFile)
    {
        Product product1 = null;
        try {
            product1 = productService.updateProduct(id,product,imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to update",HttpStatus.BAD_REQUEST);
        }
        if(product1!=null)
        {
            return new ResponseEntity<>("updated",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("not updated failded to update",HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id)
    {
        Product product = productService.getById(id);
        if (product!=null)
        {
            productService.deleteProduct(id);
            return new ResponseEntity<>("deleted",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("not found",HttpStatus.NOT_FOUND);
        }
    }


}
