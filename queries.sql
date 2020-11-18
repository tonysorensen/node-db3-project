-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
 SELECT product.ProductName
        , category.CategoryName
    FROM Product
    INNER JOIN Category ON product.CategoryId = category.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
    SELECT o.Id
        , o.orderdate
        , shipper.CompanyName
    FROM "order" as o
    INNER JOIN shipper ON o.ShipVia = shipper.Id
    ORDER BY orderdate
    LIMIT 429


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
 SELECT o.id as [OrderId]
        , o.Quantity
        , product.ProductName
    FROM OrderDetail as o
    INNER JOIN product ON o.ProductId = product.Id
    WHERE [OrderId] LIKE '10251%'

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.id as [Order ID]
        , customer.CompanyName as [Customer Company]
        , employee.LastName as [Employee Last Name]
    FROM [order] as o
    INNER JOIN employee ON o.EmployeeId = employee.Id
    INNER JOIN customer ON o.CustomerId = customer.Id